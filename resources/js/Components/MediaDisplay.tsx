import { useEffect, useRef, useState } from 'react';
import { getYouTubeThumbnail } from '@/utils/youtube';

declare global {
    interface Window {
        YT?: any;
        onYouTubeIframeAPIReady?: () => void;
    }
}

let youTubeApiPromise: Promise<void> | null = null;

const loadYouTubeApi = () => {
    if (typeof window === 'undefined') return Promise.resolve();
    if (window.YT?.Player) return Promise.resolve();
    if (!youTubeApiPromise) {
        youTubeApiPromise = new Promise((resolve) => {
            const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
            if (existingScript) {
                const prevReady = window.onYouTubeIframeAPIReady;
                window.onYouTubeIframeAPIReady = () => {
                    prevReady?.();
                    resolve();
                };
                return;
            }

            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScript = document.getElementsByTagName('script')[0];
            if (firstScript?.parentNode) {
                firstScript.parentNode.insertBefore(tag, firstScript);
            } else {
                document.head.appendChild(tag);
            }

            window.onYouTubeIframeAPIReady = () => resolve();
        });
    }
    return youTubeApiPromise;
};

const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

interface MediaDisplayProps {
    image?: string | null;
    videoUrl?: string | null;
    title: string;
    className?: string;
    showVideo?: boolean; // If true, show embedded video; if false, show thumbnail
    loading?: 'lazy' | 'eager';
}

export const MediaDisplay = ({ 
    image, 
    videoUrl, 
    title, 
    className = '',
    showVideo = true,
    loading = 'lazy'
}: MediaDisplayProps) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const playerContainerRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(100);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Priority: 
    // 1. If showVideo=true and videoUrl exists -> show embedded video
    // 2. If videoUrl exists -> show video thumbnail (video takes priority over image)
    // 3. If image exists -> show image
    // 4. Show placeholder

    const videoId = videoUrl?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1];
    const pausedPreviewSrc = image || getYouTubeThumbnail(videoUrl || '', 'hq');

    useEffect(() => {
        if (typeof document === 'undefined') return;
        const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    useEffect(() => {
        if (!showVideo || !videoId) return;

        let active = true;

        loadYouTubeApi().then(() => {
            if (!active || !playerContainerRef.current || !window.YT?.Player) return;

            if (playerRef.current?.destroy) {
                playerRef.current.destroy();
                playerRef.current = null;
            }

            playerRef.current = new window.YT.Player(playerContainerRef.current, {
                videoId,
                playerVars: {
                    autoplay: 1,
                    controls: 0, // Hide YouTube native controls (we use custom controls)
                    modestbranding: 1,
                    rel: 0,
                    playsinline: 1,
                    iv_load_policy: 3,
                    disablekb: 1,
                    fs: 0,
                    cc_load_policy: 0,
                    mute: 1,
                    enablejsapi: 1,
                    origin: window.location.origin
                },
                events: {
                    onReady: (event: any) => {
                        if (!active) return;
                        setIsReady(true);
                        const nextDuration = event.target.getDuration?.() ?? 0;
                        setDuration(nextDuration);
                        const nextVolume = event.target.getVolume?.() ?? 100;
                        setVolume(nextVolume);
                        setIsMuted(event.target.isMuted?.() ?? false);
                        event.target.unMute?.();
                        setIsMuted(true);
                        event.target.playVideo?.();
                    },
                    onStateChange: (event: any) => {
                        if (!active) return;
                        const state = event.data;
                        const isPlayState =
                            state === window.YT.PlayerState.PLAYING ||
                            state === window.YT.PlayerState.BUFFERING;
                        setIsPlaying(isPlayState);
                    }
                }
            });
        });

        return () => {
            active = false;
            if (playerRef.current?.destroy) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
            setIsReady(false);
            setIsPlaying(false);
            setCurrentTime(0);
            setDuration(0);
        };
    }, [showVideo, videoId]);

    useEffect(() => {
        if (!isReady) return;
        const intervalId = window.setInterval(() => {
            const player = playerRef.current;
            if (!player?.getCurrentTime) return;
            setCurrentTime(player.getCurrentTime());
            const nextDuration = player.getDuration?.() ?? 0;
            if (nextDuration && nextDuration !== duration) {
                setDuration(nextDuration);
            }
        }, 500);

        return () => window.clearInterval(intervalId);
    }, [isReady, duration]);

    const handlePlayPause = () => {
        const player = playerRef.current;
        if (!player?.getPlayerState) return;
        const state = player.getPlayerState();
        if (state === window.YT.PlayerState.PLAYING) {
            player.pauseVideo?.();
        } else {
            player.playVideo?.();
        }
    };

    const handleMuteToggle = () => {
        const player = playerRef.current;
        if (!player) return;
        if (player.isMuted?.()) {
            player.unMute?.();
            setIsMuted(false);
        } else {
            player.mute?.();
            setIsMuted(true);
        }
    };

    const handleVolumeChange = (value: number) => {
        const player = playerRef.current;
        if (!player?.setVolume) return;
        const nextVolume = Math.max(0, Math.min(100, value));
        player.setVolume(nextVolume);
        setVolume(nextVolume);
        if (nextVolume === 0) {
            setIsMuted(true);
        } else {
            if (player.isMuted?.()) {
                player.unMute?.();
            }
            setIsMuted(false);
        }
    };

    const handleSeek = (value: number) => {
        const player = playerRef.current;
        if (!player?.seekTo || !duration) return;
        const nextTime = (value / 100) * duration;
        player.seekTo(nextTime, true);
        setCurrentTime(nextTime);
    };

    const handleSkip = (deltaSeconds: number) => {
        const player = playerRef.current;
        if (!player?.getCurrentTime || !player?.seekTo) return;
        const baseTime = player.getCurrentTime();
        const maxTime = player.getDuration?.() ?? duration;
        const nextTime = Math.min(Math.max(0, baseTime + deltaSeconds), maxTime || 0);
        player.seekTo(nextTime, true);
        setCurrentTime(nextTime);
    };

    const handleFullscreen = () => {
        const wrapper = wrapperRef.current;
        if (!wrapper || typeof document === 'undefined') return;
        if (!document.fullscreenElement) {
            wrapper.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    // If video URL exists and we want to show the video (not just thumbnail)
    if (videoUrl && showVideo) {
        if (videoId) {
            const progressValue = duration ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
            const showMuted = isMuted || volume === 0;
            return (
                <div ref={wrapperRef} className={`relative ${className}`}>
                    <div ref={playerContainerRef} className="absolute inset-0 h-full w-full" />

                    {!isPlaying && (
                        <div className="absolute inset-0 z-10 overflow-hidden bg-[hsl(var(--BashTv-navy))]">
                            {pausedPreviewSrc ? (
                                <img
                                    src={pausedPreviewSrc}
                                    alt={title}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--BashTv-navy))] via-black/70 to-accent/30" />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/15" />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={handlePlayPause}
                                    className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 transition hover:bg-black/70"
                                    aria-label="Resume video"
                                    disabled={!isReady}
                                >
                                    <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="absolute left-4 top-4 rounded-full bg-black/45 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                                {currentTime > 0 ? 'Paused' : 'Ready to play'}
                            </div>
                        </div>
                    )}

                    <div className="absolute inset-0 z-20 flex flex-col justify-end pointer-events-none">
                        <div className="pointer-events-auto bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
                            <div className="flex items-center gap-2 text-white">
                                <button
                                    type="button"
                                    onClick={handlePlayPause}
                                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 transition flex items-center justify-center"
                                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                                    disabled={!isReady}
                                >
                                    {isPlaying ? (
                                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                            <rect x="6" y="5" width="4" height="14" rx="1" />
                                            <rect x="14" y="5" width="4" height="14" rx="1" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSkip(-10)}
                                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 transition flex items-center justify-center"
                                    aria-label="Rewind 10 seconds"
                                    disabled={!isReady}
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                        <path d="M11 5v14L2 12l9-7zM22 5v14l-9-7 9-7z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSkip(10)}
                                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 transition flex items-center justify-center"
                                    aria-label="Forward 10 seconds"
                                    disabled={!isReady}
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                        <path d="M13 5v14l9-7-9-7zM2 5v14l9-7-9-7z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleMuteToggle}
                                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 transition flex items-center justify-center"
                                    aria-label={showMuted ? 'Unmute video' : 'Mute video'}
                                    disabled={!isReady}
                                >
                                    {showMuted ? (
                                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                            <path d="M4 9v6h4l5 5V4L8 9H4z" />
                                            <path d="M16 9l4 4m0-4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                            <path d="M4 9v6h4l5 5V4L8 9H4z" />
                                            <path d="M16 8c1.5 1.5 1.5 6.5 0 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M19 6c2.5 2.5 2.5 9.5 0 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    )}
                                </button>
                                <div className="hidden sm:flex items-center gap-2 w-28">
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={volume}
                                        onChange={(e) => handleVolumeChange(Number(e.target.value))}
                                        className="h-1 w-full accent-primary"
                                        aria-label="Volume"
                                        disabled={!isReady}
                                    />
                                </div>
                                <div className="ml-auto flex items-center gap-2">
                                    <div className="text-xs tabular-nums text-white/80">
                                        {formatTime(currentTime)} / {formatTime(duration)}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleFullscreen}
                                        className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 transition flex items-center justify-center"
                                        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                                    >
                                        {isFullscreen ? (
                                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                                <path d="M9 9H5V5h4V3H3v6h6V9zm6-6v2h4v4h2V3h-6zm4 12v4h-4v2h6v-6h-2zM9 19H5v-4H3v6h6v-2z" />
                                            </svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                                <path d="M7 14H5v5h5v-2H7v-3zm0-4h2V7h3V5H5v5zm10 9h-3v2h5v-5h-2v3zm0-14V5h-5v2h3v3h2V5z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={progressValue}
                                    onChange={(e) => handleSeek(Number(e.target.value))}
                                    className="h-1 w-full accent-primary"
                                    aria-label="Seek video"
                                    disabled={!isReady || !duration}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    
    // If video URL exists, show thumbnail (takes priority over image)
    if (videoUrl) {
        const thumbnail = getYouTubeThumbnail(videoUrl, 'hq'); // Use 'hq' for better compatibility
        if (thumbnail) {
            return (
                <img 
                    src={thumbnail} 
                    alt={title}
                    loading={loading}
                    className={className || 'w-full h-full object-cover'}
                    onError={(e) => {
                        // Fallback to medium quality, then default quality if high quality fails
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes('hqdefault')) {
                            const mqThumbnail = getYouTubeThumbnail(videoUrl, 'mq');
                            if (mqThumbnail) {
                                target.src = mqThumbnail;
                                return;
                            }
                        }
                        const fallbackThumbnail = getYouTubeThumbnail(videoUrl, 'default');
                        if (fallbackThumbnail && target.src !== fallbackThumbnail) {
                            target.src = fallbackThumbnail;
                        }
                    }}
                />
            );
        }
    }
    
    // If image exists
    if (image) {
        return (
            <img 
                src={image} 
                alt={title}
                loading={loading}
                className={className || 'w-full h-full object-cover'}
            />
        );
    }
    
    // Placeholder
    return (
        <div className={`flex items-center justify-center bg-gradient-to-br from-primary/15 via-accent/10 to-[hsl(var(--BashTv-cyan))]/15 ${className}`}>
            <svg 
                className="h-12 w-12 text-primary opacity-40" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
            </svg>
        </div>
    );
};
