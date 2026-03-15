import { type ComponentProps } from 'react';
import { BRAND_NAME } from '@/lib/brand';

interface ApplicationLogoProps extends ComponentProps<'img'> {
    className?: string;
}

export default function ApplicationLogo({ className = '', ...props }: ApplicationLogoProps) {
    return (
        <img src="/bashTvMedia-removebg-preview.png" alt={BRAND_NAME} className={className} {...props} />
    );
}
