import {useEffect, useRef, useState} from 'react';

/** Determines, whether element is currently displayd by boundingClientRect */
export const useIsElementVisible = (element: Element | null) => {
    const observer = useRef<ResizeObserver>();
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const callback = (entries: ResizeObserverEntry[]) => {
            entries.forEach((entry) => {
                // Assuming this observer has only one entry
                const rect = entry.target.getBoundingClientRect();
                setIsVisible(rect.height > 0 && rect.width > 0);
            });
        };

        observer.current = new ResizeObserver(callback);

        return () => {
            observer.current?.disconnect();
            observer.current = undefined;
        };
    }, []);

    useEffect(() => {
        if (element) {
            observer.current?.observe(element);
        }
        return () => {
            if (element) {
                observer.current?.unobserve(element);
            }
        };
    }, [element]);

    return isVisible;
};
