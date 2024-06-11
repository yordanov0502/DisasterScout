import { useRef, useEffect } from 'react';
import './infinite-scroll.scss';

export const InfiniteScroll = ({ images, speed }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        let start = Date.now();

        const animate = () => {
            const elapsed = Date.now() - start;
            const scrollWidth = scrollContainer.scrollWidth / 2;
            const scrollAmount = (elapsed / speed) * scrollWidth;

            scrollContainer.scrollLeft = scrollAmount % scrollWidth;

            requestAnimationFrame(animate);
        };

        animate();
    }, [speed]);

    return (
        <div className="infinite-scroll" ref={scrollRef}>
            <div className="infinite-scroll__content">
                {images.map((img, index) => (
                    <img key={index} src={img.src} alt={img.name} className="infinite-scroll__image" />
                ))}
                {images.map((img, index) => (
                    <img key={index + images.length} src={img.src} alt={img.name} className="infinite-scroll__image" />
                ))}
            </div>
        </div>
    );
};