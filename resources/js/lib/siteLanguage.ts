export type SiteLanguage = 'ha' | 'en';

type LocalizedText = Record<SiteLanguage, string>;

export const DEFAULT_SITE_LANGUAGE: SiteLanguage = 'ha';
export const SITE_LANGUAGE_STORAGE_KEY = 'bashtv-site-language';
export const SITE_LOCALE: Record<SiteLanguage, string> = {
    ha: 'ha-NG',
    en: 'en-US',
};

type DeskPageFallback = {
    title: string;
    eyebrow: string;
    description: string;
    summary: string;
    focus_points: string[];
    cta_label: string;
    secondary_cta_label?: string;
    contact_options?: Array<{
        title: string;
        value: string;
        description: string;
        href: string;
        external: boolean;
    }>;
};

const categoryTranslations: Record<string, LocalizedText> = {
    headlines: { ha: 'Manyan Labarai', en: 'Headlines' },
    'hausa-news': { ha: 'Labaran Hausa', en: 'Hausa News' },
    politics: { ha: 'Siyasa', en: 'Politics' },
    reports: { ha: 'Rahotanni', en: 'Reports' },
    interviews: { ha: 'Hirarraki', en: 'Interviews' },
    explainers: { ha: 'Bayani Cikin Sauki', en: 'Explainers' },
    'community-watch': { ha: 'Lamarin Alumma', en: 'Community Watch' },
    business: { ha: 'Kasuwanci', en: 'Business' },
    world: { ha: 'Duniya', en: 'World' },
    'media-watch': { ha: 'Kafafen Yada Labarai', en: 'Media Watch' },
    'breaking-stories': { ha: 'Labarai Masu Zafi', en: 'Breaking Stories' },
    'special-features': { ha: 'Rahotanni Na Musamman', en: 'Special Features' },
    contact: { ha: 'Tuntube Mu', en: 'Contact' },
    news: { ha: 'Labarai', en: 'News' },
    metro: { ha: 'Birane', en: 'Metro' },
};

const subcategoryTranslations: Record<string, LocalizedText> = {
    'top-stories': { ha: 'Fitattun Labarai', en: 'Top Stories' },
    'breaking-flow': { ha: 'Labarai Masu Zafi', en: 'Breaking Flow' },
    'daily-brief': { ha: 'Takaitaccen Rahoto', en: 'Daily Brief' },
    'northern-affairs': { ha: 'Lamuran Arewa', en: 'Northern Affairs' },
    'community-voices': { ha: 'Muryoyin Alumma', en: 'Community Voices' },
    'hausa-bulletin': { ha: 'Takaitaccen Labarin Hausa', en: 'Hausa Bulletin' },
    'abuja-watch': { ha: 'Hangen Abuja', en: 'Abuja Watch' },
    'statehouse-monitor': { ha: 'Bibiyar Fadar Gwamnati', en: 'Statehouse Monitor' },
    'election-tracker': { ha: 'Bibiyar Zabe', en: 'Election Tracker' },
    'field-reports': { ha: 'Rahotannin Fili', en: 'Field Reports' },
    'video-bulletins': { ha: 'Bidiyon Labarai', en: 'Video Bulletins' },
    'newsroom-packages': { ha: 'Kunshin Rahotanni', en: 'Newsroom Packages' },
    'studio-conversations': { ha: 'Hirar Studio', en: 'Studio Conversations' },
    'guest-voices': { ha: 'Muryoyin Baki', en: 'Guest Voices' },
    'editorial-qa': { ha: 'Tambaya da Amsa', en: 'Editorial Q&A' },
    'policy-breakdown': { ha: 'Bayanin Manufofi', en: 'Policy Breakdown' },
    'fact-file': { ha: 'Bayanan Gaskiya', en: 'Fact File' },
    'issue-context': { ha: 'Mahallin Batu', en: 'Issue Context' },
    'education-watch': { ha: 'Hangen Ilimi', en: 'Education Watch' },
    'health-watch': { ha: 'Hangen Lafiya', en: 'Health Watch' },
    'public-interest': { ha: 'Amfanin Jamaa', en: 'Public Interest' },
    'market-watch': { ha: 'Hangen Kasuwa', en: 'Market Watch' },
    'cost-of-living': { ha: 'Tsadar Rayuwa', en: 'Cost of Living' },
    'enterprise-desk': { ha: 'Teburin Kasuwanci', en: 'Enterprise Desk' },
    'regional-update': { ha: 'Rahoton Yankuna', en: 'Regional Update' },
    'diaspora-watch': { ha: 'Hangen Yan Waje', en: 'Diaspora Watch' },
    'global-brief': { ha: 'Takaitaccen Rahoton Duniya', en: 'Global Brief' },
    'youtube-desk': { ha: 'Teburin YouTube', en: 'YouTube Desk' },
    'facebook-desk': { ha: 'Teburin Facebook', en: 'Facebook Desk' },
    'social-pulse': { ha: 'Yanayin Soshiyal', en: 'Social Pulse' },
};

const deskPageHausaCopy: Record<
    string,
    Omit<DeskPageFallback, 'cta_label' | 'secondary_cta_label'> & {
        cta_label: string;
        secondary_cta_label?: string;
    }
> = {
    headlines: {
        title: 'Manyan Labarai',
        eyebrow: 'Teburin Labarai',
        description:
            'Shafi ne na BASHTV MEDIA da aka tsara domin manyan labarai, sabbin bayanai, da rahotannin da masu karatu ya kamata su fara gani.',
        summary: 'Kasance kusa da labaran da ke daukar hankalin jamaa a wannan lokaci.',
        focus_points: ['Fitattun labarai', 'Labarai masu zafi', 'Muhimman bayanai'],
        cta_label: 'Duba Rukunai',
        secondary_cta_label: 'Koma Gida',
    },
    politics: {
        title: 'Siyasa',
        eyebrow: 'Teburin Harkokin Jamaa',
        description:
            'Rahotannin siyasa, sabbin manufofi, jagoranci, da harkokin jamaa cikin salo mai tsabta na BASHTV.',
        summary: 'Bibiyar gwamnati, zabe, shugabanci, da matakan da ke shafar rayuwar yau da kullum.',
        focus_points: ['Gwamnati', 'Bibiyar manufofi', 'Harkokin jamaa'],
        cta_label: 'Duba Karin Labarai',
        secondary_cta_label: 'Manyan Labarai',
    },
    world: {
        title: 'Duniya',
        eyebrow: 'Teburin Duniya',
        description:
            'Labaran kasashen duniya da abubuwan da ke faruwa a waje domin masu sauraron BASHTV.',
        summary: 'Abubuwan da ke faruwa a duniya cikin karatu mai sauki da tsari mai kyau.',
        focus_points: ['Harkokin duniya', 'Sabbin bayanai', 'Rahoto mai mahallin batu'],
        cta_label: 'Duba Rukunai',
        secondary_cta_label: 'Manyan Labarai',
    },
    business: {
        title: 'Kasuwanci',
        eyebrow: 'Teburin Tattalin Arziki',
        description:
            'Rahotannin kasuwanci, kasuwanni, tattalin arziki, da lamuran rayuwa da ke shafar jamaa.',
        summary: 'Bibiya kan kasuwanci, ciniki, ci gaba, da labaran kudi cikin karara.',
        focus_points: ['Tattalin arziki', 'Ciniki', 'Hangen kasuwa'],
        cta_label: 'Duba Rukunai',
        secondary_cta_label: 'Manyan Labarai',
    },
    reports: {
        title: 'Rahotanni',
        eyebrow: 'Teburin Bidiyo',
        description:
            'Rahotannin fili, kunshin labarai, da labaran gani da ido cikin salo mai karfi na BASHTV.',
        summary: 'Kalli kuma karanta manyan rahotanni daga wuri guda.',
        focus_points: ['Rahotannin fili', 'Labaran bidiyo', 'Kunshin labarai'],
        cta_label: 'Bude Tashar YouTube',
        secondary_cta_label: 'Manyan Labarai',
    },
    interviews: {
        title: 'Hirarraki',
        eyebrow: 'Teburin Tattaunawa',
        description:
            'Hirarraki, tattaunawa, da aikin jarida mai dogaro da murya cikin wurin da ya dace da BASHTV.',
        summary: 'Muryoyi da raayoyi da ke kara zurfin fahimta ga labarai.',
        focus_points: ['Muryoyin baki', 'Tattaunawa mai zurfi', 'Mahallin batu'],
        cta_label: 'Bude Tashar YouTube',
        secondary_cta_label: 'Manyan Labarai',
    },
    explainers: {
        title: 'Bayani Cikin Sauki',
        eyebrow: 'Teburin Nazari',
        description:
            'Bayani masu amfani, masu saukin karatu, da saukin fahimta ga labaran da ke bukatar karin haske.',
        summary: 'Ga masu bukatar fiye da kanun labari, tare da bayanin da aka warware sosai.',
        focus_points: ['Mahallin batu', 'Tarihi', 'Abin da yake nufi'],
        cta_label: 'Duba Rukunai',
        secondary_cta_label: 'Bude Teburin Bidiyo',
    },
    'special-features': {
        title: 'Rahotanni Na Musamman',
        eyebrow: 'Teburin Musamman',
        description:
            'Manyan rubuce-rubuce, kunshin rahotanni, da labaran musamman cikin yanayi mai kyau da nutsuwa.',
        summary: 'Dogayen labarai masu zurfi da suka cancanci kwanciyar hankali da kyakkyawan salo.',
        focus_points: ['Labaran musamman', 'Dogayen rubuce-rubuce', 'Kunshin editoci'],
        cta_label: 'Duba Rukunai',
        secondary_cta_label: 'Manyan Labarai',
    },
    'hausa-news': {
        title: 'Labaran Hausa',
        eyebrow: 'Teburin Masu Sauraro',
        description:
            'Wuri ne da aka tsara musamman domin bukatun masu karatun Hausa, saukin fahimta, da amfani ga alumma.',
        summary: 'Rahoto mai sauri da saukin karatu domin masu sauraron Hausa.',
        focus_points: ['Masu sauraron Hausa', 'Karatu mai sauki', 'Labaran alumma'],
        cta_label: 'Manyan Labarai',
        secondary_cta_label: 'Bude Tashar YouTube',
    },
    'breaking-stories': {
        title: 'Labarai Masu Zafi',
        eyebrow: 'Sabbin Bayanai Kai Tsaye',
        description:
            'Wurin da BASHTV ke kawo gaggawar labarai da canje-canje da masu karatu ke son bibiyarsu nan take.',
        summary: 'Wuri mai tsabta domin bin sabbin labarai masu saurin canzawa.',
        focus_points: ['Gaggawar bayanai', 'Karatu mai sauri', 'Muhimman sabbin abubuwa'],
        cta_label: 'Manyan Labarai',
        secondary_cta_label: 'Duba Rukunai',
    },
    'community-watch': {
        title: 'Lamarin Alumma',
        eyebrow: 'Teburin Alumma',
        description:
            'Labaran rayuwar jamaa, damuwar alumma, da abubuwan da ke kusantar BASHTV da bukatun yau da kullum.',
        summary: 'Wuri domin batutuwan anfani ga jamaa da labaran da ke da tasiri a kusa.',
        focus_points: ['Lamuran kasa', 'Anfanin jamaa', 'Tasirin gida'],
        cta_label: 'Tuntubi Dakin Labarai',
        secondary_cta_label: 'Manyan Labarai',
    },
    contact: {
        title: 'Tuntube Mu',
        eyebrow: 'Tuntubar BASHTV',
        description:
            'Tuntuɓi BASHTV MEDIA domin harkokin edita, shawarar labari, hadin gwiwa, da sauran sakonni ga dakin labarai.',
        summary: 'Zabi hanya mafi sauri domin isa ga tawagar dakin labarai.',
        focus_points: ['Tambayoyin edita', 'Shawarar labarai', 'Hadin gwiwa'],
        cta_label: 'Aika Imel Zuwa Dakin Labarai',
        secondary_cta_label: 'Bude Tashar YouTube',
        contact_options: [
            {
                title: 'Tambayoyin Edita',
                value: 'news@bashtvmedia.com',
                description: 'Domin tambayoyi, gyara kuskure, ko sakon hukuma ga dakin labarai.',
                href: 'mailto:news@bashtvmedia.com',
                external: true,
            },
            {
                title: 'Shawarwarin Labari',
                value: 'Aika Shawara',
                description: 'Raba mana bayanai, sabbin labarai, ko muhimman abubuwan alumma.',
                href: 'mailto:news@bashtvmedia.com?subject=Story%20Tip',
                external: true,
            },
            {
                title: 'Hadin Gwiwa',
                value: 'Harkokin Media da Tallafi',
                description: 'Domin hirarraki, tallafi, daukar nauyi, ko damar aiki tare.',
                href: 'mailto:news@bashtvmedia.com?subject=Partnership%20Inquiry',
                external: true,
            },
            {
                title: 'Teburin YouTube',
                value: '@bashtvhausa',
                description: 'Bi tashar BASHTV domin rahotanni na bidiyo da sabbin bayanai.',
                href: 'https://www.youtube.com/channel/UCy8ZkVmZ-iPcS8YlQ7A8_3Q',
                external: true,
            },
        ],
    },
};

export const siteCopy = {
    ha: {
        branding: {
            tagline: 'Jaridar Hausa mai karfi ta hanyar bidiyo, manyan labarai, da rahotanni masu kaifi.',
            shortTagline: 'Labaran Hausa • Rahotannin Bidiyo • Hirarraki',
        },
        header: {
            watchChannel: 'Kalli Tasha',
            watchShort: 'Kalli',
            home: 'Gida',
            searchPlaceholder: 'Binciko manyan labarai, rahotanni, da labaran bidiyo...',
            searchButton: 'Bincike',
            featuredVideos: 'Fitattun Bidiyo',
            searchAria: 'Bude bincike',
            themeAria: 'Canja yanayin haske',
        },
        footer: {
            sections: {
                coverage: 'Labarai',
                videoDesk: 'Teburin Bidiyo',
                audience: 'Masu Sauraro',
            },
            stayConnected: 'Kasance Tare da Mu',
            followYouTube: 'Bi BASHTV MEDIA a YouTube',
            followDescription:
                'Kalli sabbin rahotanni, hirarraki, da bidiyon labarai kai tsaye daga tashar mu.',
            openChannel: 'Bude Tasha',
            focusLabel: 'Mayar da hankali',
            focusValue: 'Rahoto da bidiyo a gaba',
            audienceLabel: 'Masu Sauraro',
            audienceValue: 'Alummar labaran Hausa',
            platformLabel: 'Dandali',
            platformValue: 'Media da YouTube ke jagoranta',
            audienceText:
                'An gina shi domin masu sauraron Hausa da ke son bidiyo, tsabtataccen kanun labarai, da sahihan bayanai.',
            copyright:
                'BASHTV MEDIA. An kiyaye dukkan hakkoki.',
            footerNote: 'Media ta Hausa mai tsari, kyan gani, da rahoton bidiyo mai sauri.',
        },
        hero: {
            leadStory: 'Babban Labari',
            topStory: 'Fitaccen Labari',
            stories: 'Labarai',
            videos: 'Bidiyo',
            desks: 'Sassa',
            watchBrand: 'Kalli BashTV Media',
            latestFromDesk: 'Sabbin Labarai Daga Teburinmu',
            latestDescription: 'Kanun labarai masu sauri domin shafin farko.',
            spotlight: 'Haske',
        },
        featuredVideos: {
            title: 'Fitattun Bidiyo',
            heading: 'Sabbin labaran bidiyo, rahotanni, da daukar hoto na BashTV.',
            description:
                'A kawo bidiyo gaba domin shafin ya yi kama da cikakkiyar media ta BASHTV MEDIA.',
            visitChannel: 'Ziyarci Tashar YouTube',
            spotlight: 'Fitaccen Bidiyo',
            watch: 'Kalli',
            fallbackEyebrow: 'Dakin labarai na bidiyo',
            fallbackHeading: 'Karin bidiyo. Karancin nauyin tsohon salon jarida.',
            fallbackDescription:
                'Wannan sashe a shirye yake domin karin bidiyo yayin da editoci ke wallafa labaran YouTube cikin tsarin post na yanzu.',
        },
        mainContent: {
            topStories: 'Manyan Labarai',
            topStoriesDescription: 'Mafi karfin kanun labarai a shafin farko na BASHTV MEDIA.',
            videoBulletin: 'Bidiyon Labarai',
            videoHeading: 'Karin hotuna masu motsi. Karin labarai da suka dace da allo.',
            videoDescription:
                'Karfafa ainihin BASHTV MEDIA da layin bidiyo a cikin babban kwararar labarai.',
            watchOnYouTube: 'Kalli a YouTube',
            acrossDesk: 'A Fadin Teburin Labarai',
            acrossDeskHeading: 'Tsari mai tsafta da zamani domin karin labaran BASHTV.',
            promoHeading: 'Sabon salo mai kaifi domin media mai muhimmanci.',
            promoDescription:
                'Shafin farko yanzu ya fi karkata ga bidiyo, tsari mai kyau, tambari masu kyau, da karfin kamannin Hausa yayin da injin post din baya canjawa.',
            promoItems: [
                'Fitattun bangarorin bidiyo',
                'Katin da tambarin BASHTV masu kyau',
                'Tsarin da aka fara da wayar hannu',
            ],
            news: 'Labarai',
            newsDescription:
                'Har yanzu akwai tsarin labarai na yau da kullum a karkashin sabon mashigar da bidiyo ke jagoranta.',
            metro: 'Birane',
            metroDescription:
                'A bar rahotannin yankuna da alumma cikin tsarin da ya fi saukin dubawa.',
        },
        categoriesIndex: {
            title: 'Dukkan Rukunai',
            description: 'Duba labarai bisa rukuni',
            empty: 'Ba a samu wani rukuni ba.',
        },
        search: {
            title: 'Sakamakon Bincike',
            showingFor: 'Ana nuna sakamako na',
            noResults: 'Ba a samu sakamako ba',
            noResultsDescription:
                'Ba mu samu wani labari da ya dace da kalmar da ka nema ba. Ka gwada sabbin kalmomi ko ka duba rukunai.',
            backHome: 'Koma Gida',
            browseCategories: 'Duba Rukunai',
        },
        categoryPage: {
            category: 'Rukuni',
            categoryDesk: 'Teburin Rukuni',
            leadCoverage: 'Fitaccen Rahoto',
            videoStory: 'Labarin Bidiyo',
            snapshot: 'Takaitaccen Hoto',
            snapshotTemplate: (name: string) => `${name} na bukatar shafi mai kaifi.`,
            snapshotDescription:
                'Wannan rukuni yana rike tsarin archive na asali, amma yanzu yana da tsabta, karfi, da salo na media da ya fi dacewa da masu karatun BASHTV.',
            activeSubcategories: 'Karamin Rukunai Masu Aiki',
            browseBySubcategory: 'Duba Ta Karamin Rukuni',
            allCategory: (name: string) => `Dukkan ${name}`,
            emptyTitle: 'Ba a samu labarai a wannan rukuni ba tukuna.',
            emptyDescription:
                'Da zarar an wallafa sabbin rahotanni a wannan sashe, za su bayyana a nan cikin sabon salo na BASHTV.',
            backHome: 'Koma Gida',
        },
        subcategoryPage: {
            categories: 'Rukunai',
            desk: 'Teburin Karamin Rukuni',
            inCategory: (name: string) => `a cikin ${name}`,
            leadStory: 'Babban Labari',
            videoStory: 'Labarin Bidiyo',
            deskNotes: 'Bayanan Teburi',
            deskHeading: (name: string) => `Tsari mafi tsauri a cikin ${name}.`,
            deskDescription:
                'Wannan shafi yana rike tsarin archive na karamin rukuni, amma yana karatu kamar tsaftataccen teburin media na BASHTV.',
            storiesAvailable: 'Labarai da ke Akwai',
            browseCategory: (name: string) => `Duba ${name}`,
            readMore: 'Ci gaba da karantawa',
            previous: 'Na baya',
            next: 'Na gaba',
            emptyTitle: 'Babu Labarai Yanzu',
            emptyDescription:
                'A yanzu babu wani post a wannan karamin rukuni, amma an riga an shirya shafin domin sabbin rahotannin BASHTV.',
        },
        postPage: {
            home: 'Gida',
            topStory: 'Fitaccen Labari',
            videoReport: 'Rahoton Bidiyo',
            postNotFound: 'Ba a samu labarin ba',
            postNotFoundDescription: 'Ba a iya gano labarin da ka nema ba.',
            backHome: 'Koma Gida',
            share: 'Raba',
            shareOnFacebook: 'Raba a Facebook',
            shareOnTwitter: 'Raba a X',
            shareOnWhatsApp: 'Raba a WhatsApp',
            copyLink: 'Kwafi mahada',
            save: 'Ajiye',
            like: 'So',
            comment: 'Sharhi',
            comments: 'Sharhuka',
            signInToComment: 'Shiga domin yin sharhi',
            leaveComment: 'domin barin sharhi',
            noComments: 'Har yanzu babu sharhi. Ka zama na farko da zai fadi raayinsa.',
            aboutAuthor: 'Game da Marubucin',
            authorFallback: 'Dan rahoto a BASHTV MEDIA',
            editorialDesk: 'Teburin Edita',
            stayUpdated: 'Kasance da sabbin bayanai',
            stayUpdatedDescription: 'Samu sabbin labarai da bayanan makala daga BASHTV MEDIA.',
            emailPlaceholder: 'Saka imel dinka',
            subscribe: 'Yi rajista',
            trendingNow: 'Ana karantawa yanzu',
            moreFrom: (name: string) => `Karin labarai daga ${name}`,
            relatedArticles: 'Sauran Labarai',
            noRelatedArticles: 'Ba a samu wasu labarai masu nasaba ba.',
            views: 'kallo',
            view: 'kallo',
            imageCaptionFallback: 'Rahoton gani na BASHTV MEDIA',
            loadingError: 'An kasa bude labarin',
        },
        footerPages: {
            quickReach: 'Sauri Wajen Tuntuɓa',
            quickReachHeading: 'Tuntubi tawagar BASHTV cikin sauki.',
            quickReachDescription:
                'Yi amfani da imel na dakin labarai, aika shawara, ko shiga teburin YouTube domin sadarwar bidiyo.',
            leadStory: 'Babban Labari',
            videoStory: 'Labarin Bidiyo',
            deskFallback: 'Teburin BASHTV',
            contactOptions: 'Hanyoyin Tuntuɓa',
            contactHeading: 'Zabi hanya mafi dacewa zuwa dakin labarai.',
            includeTitle: 'Abin da Ya Kamata Ka Hada',
            includeItems: [
                'Sunanka da dalilin tuntuba',
                'Mahallin batu ko maha idan kana da su',
                'Tambayoyin bidiyo ko damar YouTube',
            ],
            newsroomFlow: 'Gudanarwar Dakin Labarai',
            latestFromBrand: 'Sabbin bayanai daga BASHTV MEDIA',
            latestNewsroomStories:
                'Sabbin labaran dakin labarai za su bayyana a nan yayin da BASHTV ke ci gaba da wallafawa.',
            videoBulletin: 'Bidiyon Labarai',
            watchDeskMedia: 'Kalli bangaren bidiyo na wannan teburi.',
            coverageStream: 'Kwararar Rahotanni',
            latestIn: (name: string) => `Sabbin labarai a ${name}`,
            moreStories:
                'Karin labarai na wannan teburi za su bayyana a nan yayin da archive na BASHTV ke kara girma.',
        },
        auth: {
            access: 'Shigar BASHTV',
            editorialEntry: 'Shiga Dakin Labarai',
            shellHeading: 'Shiga dakin labarai da karfin kamannin BASHTV.',
            liveDesk: 'Teburin Kai Tsaye',
            liveDeskDescription: 'Shiga cikin sauri ga editoci, admins, da maikatan dakin labarai.',
            videoFirst: 'Bidiyo a Gaba',
            videoFirstDescription: 'Wurin aiki na zamani domin rahotannin BASHTV.',
            secureAccess: 'Shiga Cikin Tsaro',
            secureAccessDescription: 'Tsabtaccen shiga da dawo da kalmar sirri domin tawaga.',
            signature: 'Shaida',
            visitHomepage: 'Ziyarci Shafin Gida',
            light: 'Haske',
            dark: 'Duhu',
            system: 'Na naura',
            signIn: 'Shiga',
            loginHeading: 'Barka da dawowa zuwa dakin labaran BASHTV.',
            loginDescription: 'Shiga domin kula da labarai, duba sakonnin aiki, da cigaba da zirga-zirgar dakin labarai.',
            email: 'Imel',
            password: 'Kalmar sirri',
            forgotPassword: 'Ka manta kalmar sirri?',
            keepSignedIn: 'Ka bar ni a shiga a wannan naurar',
            signingIn: 'Ana shiga...',
            loginButton: 'Shiga Dashboard',
            noAccount: 'Baka da asusu?',
            signUp: 'Yi rijista',
            createAccount: 'Bude Asusun',
            registerHeading: 'Kirkiri asusun aiki na BASHTV.',
            registerDescription: 'Kirkiri damar aiki domin dakin labarai, hadin kai na editoci, da kula da dandali.',
            fullName: 'Cikakken suna',
            fullNamePlaceholder: 'Editan BashTV',
            confirmPassword: 'Tabbatar da kalmar sirri',
            creatingAccount: 'Ana kirkirar asusu...',
            createAccountButton: 'Bude Asusun',
            haveAccount: 'Kana da asusu tuni?',
            signInLink: 'Shiga',
            recovery: 'Dawo da Shiga',
            forgotHeading: 'Sake bude shigar asusun BASHTV.',
            forgotDescription: 'Saka adireshin imel dinka, za mu aiko maka da maha domin zabar sabuwar kalmar sirri.',
            sendingResetLink: 'Ana aikawa da maha...',
            sendResetLink: 'Aika Mahadar Sauya Kalmar Sirri',
            rememberPassword: 'Kana tuna kalmar sirri?',
            backToLogin: 'Koma shiga',
        },
        languageToggle: {
            label: 'Harshe',
            hausa: 'HA',
            english: 'EN',
        },
    },
    en: {
        branding: {
            tagline: 'Bold Hausa journalism through video, headlines, and sharp reporting.',
            shortTagline: 'Hausa News • Video Reports • Interviews',
        },
        header: {
            watchChannel: 'Watch Channel',
            watchShort: 'Watch',
            home: 'Home',
            searchPlaceholder: 'Search headlines, reports, and video stories...',
            searchButton: 'Search',
            featuredVideos: 'Featured Videos',
            searchAria: 'Toggle search',
            themeAria: 'Toggle theme',
        },
        footer: {
            sections: {
                coverage: 'Coverage',
                videoDesk: 'Video Desk',
                audience: 'Audience',
            },
            stayConnected: 'Stay Connected',
            followYouTube: 'Follow BASHTV MEDIA on YouTube',
            followDescription:
                'Watch the latest reports, interviews, and Hausa-language video bulletins directly from the channel.',
            openChannel: 'Open Channel',
            focusLabel: 'Focus',
            focusValue: 'Video-first reporting',
            audienceLabel: 'Audience',
            audienceValue: 'Hausa news community',
            platformLabel: 'Platform',
            platformValue: 'YouTube-led media brand',
            audienceText:
                'Built for a fast-moving Hausa audience that wants video-led storytelling, clean headlines, and credible updates.',
            copyright:
                'BASHTV MEDIA. All rights reserved.',
            footerNote: 'Modern Hausa media, premium presentation, and fast video-led reporting.',
        },
        hero: {
            leadStory: 'Lead Story',
            topStory: 'Top Story',
            stories: 'Stories',
            videos: 'Videos',
            desks: 'Desks',
            watchBrand: 'Watch BashTV Media',
            latestFromDesk: 'Latest From The Desk',
            latestDescription: 'Fast-moving headlines for the homepage rail.',
            spotlight: 'Spotlight',
        },
        featuredVideos: {
            title: 'Featured Videos',
            heading: 'BashTV’s latest video stories, reports, and on-camera coverage.',
            description:
                'Put video front and center with a premium hero reel that reflects the BASHTV MEDIA identity.',
            visitChannel: 'Visit YouTube Channel',
            spotlight: 'Video Spotlight',
            watch: 'Watch',
            fallbackEyebrow: 'Video-led newsroom',
            fallbackHeading: 'More screen presence. Less static newspaper feel.',
            fallbackDescription:
                'This section is ready for more videos as editors publish YouTube-backed stories into the existing post system.',
        },
        mainContent: {
            topStories: 'Top Stories',
            topStoriesDescription: 'The strongest headlines on the BASHTV MEDIA front page.',
            videoBulletin: 'Video Bulletin',
            videoHeading: 'More moving visuals. More screen-first storytelling.',
            videoDescription:
                'Reinforce the BASHTV MEDIA identity with a dedicated video bulletin strip inside the main news flow.',
            watchOnYouTube: 'Watch on YouTube',
            acrossDesk: 'Across The Desk',
            acrossDeskHeading: 'A clean, modern story grid for BASHTV’s broader coverage.',
            promoHeading: 'A sharper look for a serious media brand.',
            promoDescription:
                'The homepage now leans into video, cleaner hierarchy, tighter badges, and a stronger Hausa media identity while keeping the existing post engine intact.',
            promoItems: [
                'Featured video blocks',
                'Premium BASHTV badges and cards',
                'Mobile-first layout hierarchy',
            ],
            news: 'News',
            newsDescription:
                'Standard headline coverage remains available beneath the media-led entry points.',
            metro: 'Metro',
            metroDescription:
                'Keep regional and community reporting accessible in a lighter grid.',
        },
        categoriesIndex: {
            title: 'All Categories',
            description: 'Browse news by category',
            empty: 'No categories found.',
        },
        search: {
            title: 'Search Results',
            showingFor: 'Showing results for',
            noResults: 'No Results Found',
            noResultsDescription:
                'We could not find any articles matching your search. Try different keywords or browse our categories.',
            backHome: 'Back to Home',
            browseCategories: 'Browse Categories',
        },
        categoryPage: {
            category: 'Category',
            categoryDesk: 'Category Desk',
            leadCoverage: 'Lead Coverage',
            videoStory: 'Video Story',
            snapshot: 'BASHTV Snapshot',
            snapshotTemplate: (name: string) => `${name} deserves a sharper front page.`,
            snapshotDescription:
                'This category keeps the original archive structure, but the visual treatment is now cleaner, bolder, and more media-led for BASHTV readers.',
            activeSubcategories: 'Active Subcategories',
            browseBySubcategory: 'Browse by Subcategory',
            allCategory: (name: string) => `All ${name}`,
            emptyTitle: 'No articles found in this category yet.',
            emptyDescription:
                'When new reporting is published to this desk, it will appear here in the same archive structure with the updated BASHTV presentation.',
            backHome: 'Back to Home',
        },
        subcategoryPage: {
            categories: 'Categories',
            desk: 'Subcategory Desk',
            inCategory: (name: string) => `in ${name}`,
            leadStory: 'Lead Story',
            videoStory: 'Video Story',
            deskNotes: 'Desk Notes',
            deskHeading: (name: string) => `A tighter stream inside ${name}.`,
            deskDescription:
                'This page keeps the same subcategory archive structure, but now reads more like a clean BASHTV media desk with stronger hierarchy.',
            storiesAvailable: 'Stories Available',
            browseCategory: (name: string) => `Browse ${name}`,
            readMore: 'Read More',
            previous: 'Previous',
            next: 'Next',
            emptyTitle: 'No Posts Yet',
            emptyDescription:
                'There are no posts in this subcategory at the moment, but the page structure is ready for upcoming BASHTV coverage.',
        },
        postPage: {
            home: 'Home',
            topStory: 'Top Story',
            videoReport: 'Video Report',
            postNotFound: 'Post Not Found',
            postNotFoundDescription: 'The requested post could not be found.',
            backHome: 'Back to Home',
            share: 'Share',
            shareOnFacebook: 'Share on Facebook',
            shareOnTwitter: 'Share on X',
            shareOnWhatsApp: 'Share on WhatsApp',
            copyLink: 'Copy link',
            save: 'Save',
            like: 'Like',
            comment: 'Comment',
            comments: 'Comments',
            signInToComment: 'Sign in to comment',
            leaveComment: 'to leave a comment',
            noComments: 'No comments yet. Be the first to share your thoughts!',
            aboutAuthor: 'About the Author',
            authorFallback: 'Contributing reporter at BASHTV MEDIA',
            editorialDesk: 'Editorial Desk',
            stayUpdated: 'Stay updated',
            stayUpdatedDescription: 'Get the latest news and article updates from BASHTV MEDIA.',
            emailPlaceholder: 'Enter your email',
            subscribe: 'Subscribe',
            trendingNow: 'Trending Now',
            moreFrom: (name: string) => `More from ${name}`,
            relatedArticles: 'Related Articles',
            noRelatedArticles: 'No related articles found.',
            views: 'views',
            view: 'view',
            imageCaptionFallback: 'BASHTV MEDIA visual report',
            loadingError: 'Failed to load post',
        },
        footerPages: {
            quickReach: 'Quick Reach',
            quickReachHeading: 'Contact the BASHTV team without friction.',
            quickReachDescription:
                'Use the direct newsroom email, send a tip, or move into the YouTube desk for channel-based outreach.',
            leadStory: 'Lead Story',
            videoStory: 'Video Story',
            deskFallback: 'BASHTV Desk',
            contactOptions: 'Contact Options',
            contactHeading: 'Choose the right path into the newsroom.',
            includeTitle: 'What To Include',
            includeItems: [
                'Your name and reason for contact',
                'Useful context or links if you have them',
                'Channel-based inquiries for video opportunities',
            ],
            newsroomFlow: 'Newsroom Flow',
            latestFromBrand: 'Latest from BASHTV MEDIA',
            latestNewsroomStories:
                'Latest newsroom stories will appear here as BASHTV continues publishing.',
            videoBulletin: 'Video Bulletin',
            watchDeskMedia: 'Watch the media side of this desk.',
            coverageStream: 'Coverage Stream',
            latestIn: (name: string) => `Latest in ${name}`,
            moreStories:
                'More stories for this desk will appear here as the BASHTV archive grows.',
        },
        auth: {
            access: 'BASHTV Access',
            editorialEntry: 'Editorial Entry',
            shellHeading: 'Enter the newsroom with a stronger BASHTV identity.',
            liveDesk: 'Live Desk',
            liveDeskDescription: 'Fast entry for editors, admins, and newsroom staff.',
            videoFirst: 'Video First',
            videoFirstDescription: 'A media-ready control point for BASHTV reporting.',
            secureAccess: 'Secure Access',
            secureAccessDescription: 'Clean sign-in and recovery flows for the whole team.',
            signature: 'Signature',
            visitHomepage: 'Visit Homepage',
            light: 'Light',
            dark: 'Dark',
            system: 'System',
            signIn: 'Sign In',
            loginHeading: 'Welcome back to the BASHTV newsroom.',
            loginDescription: 'Log in to manage stories, review submissions, and keep the media desk moving.',
            email: 'Email',
            password: 'Password',
            forgotPassword: 'Forgot password?',
            keepSignedIn: 'Keep me signed in on this device',
            signingIn: 'Signing in...',
            loginButton: 'Login to Dashboard',
            noAccount: "Don't have an account?",
            signUp: 'Sign up',
            createAccount: 'Create Account',
            registerHeading: 'Set up a BASHTV workspace account.',
            registerDescription: 'Create access for newsroom work, editorial coordination, and platform management.',
            fullName: 'Full name',
            fullNamePlaceholder: 'BashTV Editor',
            confirmPassword: 'Confirm password',
            creatingAccount: 'Creating account...',
            createAccountButton: 'Create Account',
            haveAccount: 'Already have an account?',
            signInLink: 'Sign in',
            recovery: 'Recovery',
            forgotHeading: 'Reset your BASHTV account access.',
            forgotDescription: 'Enter your email address and we will send you a reset link so you can choose a new password.',
            sendingResetLink: 'Sending reset link...',
            sendResetLink: 'Email Password Reset Link',
            rememberPassword: 'Remember your password?',
            backToLogin: 'Back to login',
        },
        languageToggle: {
            label: 'Language',
            hausa: 'HA',
            english: 'EN',
        },
    },
};

export function translateCategoryName(
    slug: string | null | undefined,
    fallback: string | undefined,
    language: SiteLanguage,
) {
    if (slug && categoryTranslations[slug]) {
        return categoryTranslations[slug][language];
    }

    return fallback || '';
}

export function translateSubcategoryName(
    slug: string | null | undefined,
    fallback: string | undefined,
    language: SiteLanguage,
) {
    if (slug && subcategoryTranslations[slug]) {
        return subcategoryTranslations[slug][language];
    }

    return fallback || '';
}

export function getDeskPageCopy(
    slug: string,
    fallbackPage: DeskPageFallback,
    language: SiteLanguage,
) {
    if (language === 'en') {
        return fallbackPage;
    }

    const translation = deskPageHausaCopy[slug];

    if (!translation) {
        return fallbackPage;
    }

    return {
        ...fallbackPage,
        ...translation,
        focus_points: translation.focus_points || fallbackPage.focus_points,
        contact_options: translation.contact_options || fallbackPage.contact_options,
    };
}

export function formatDateForLanguage(
    value: string | number | Date,
    language: SiteLanguage,
    options?: Intl.DateTimeFormatOptions,
) {
    return new Intl.DateTimeFormat(SITE_LOCALE[language], options).format(new Date(value));
}

export function formatNumberForLanguage(value: number, language: SiteLanguage) {
    return value.toLocaleString(SITE_LOCALE[language]);
}

export function formatRelativeTimeForLanguage(
    value: string | number | Date,
    language: SiteLanguage,
) {
    const rtf = new Intl.RelativeTimeFormat(SITE_LOCALE[language], { numeric: 'auto' });
    const elapsed = new Date(value).getTime() - Date.now();
    const seconds = Math.round(elapsed / 1000);

    const divisions: Array<[number, Intl.RelativeTimeFormatUnit]> = [
        [60, 'second'],
        [60, 'minute'],
        [24, 'hour'],
        [7, 'day'],
        [4.34524, 'week'],
        [12, 'month'],
        [Number.POSITIVE_INFINITY, 'year'],
    ];

    let duration = seconds;

    for (const [amount, unit] of divisions) {
        if (Math.abs(duration) < amount) {
            return rtf.format(duration, unit);
        }

        duration = Math.round(duration / amount);
    }

    return rtf.format(duration, 'year');
}

export function getArticleLabel(count: number, language: SiteLanguage) {
    if (language === 'ha') {
        return count === 1 ? 'labari' : 'labarai';
    }

    return count === 1 ? 'article' : 'articles';
}

export function getResultLabel(count: number, language: SiteLanguage) {
    if (language === 'ha') {
        return 'sakamako';
    }

    return count === 1 ? 'result' : 'results';
}

export function getSubcategoryLabel(count: number, language: SiteLanguage) {
    if (language === 'ha') {
        return count === 1 ? 'karamin rukuni' : 'karamin rukunai';
    }

    return count === 1 ? 'subcategory' : 'subcategories';
}

export function getViewLabel(count: number, language: SiteLanguage) {
    if (language === 'ha') {
        return 'kallo';
    }

    return count === 1 ? 'view' : 'views';
}

export function getReadTimeLabel(minutes: number, language: SiteLanguage) {
    if (language === 'ha') {
        return `${minutes} mintin karatu`;
    }

    return `${minutes} min read`;
}
