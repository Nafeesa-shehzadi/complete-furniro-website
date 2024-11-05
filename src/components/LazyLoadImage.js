import React, { useEffect, useRef, useState } from "react";

const LazyLoadImage = ({ src, alt, effect, wrapperProps }) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null); // Create a ref for the observer

  const handleIntersect = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
      if (observerRef.current) {
        observerRef.current.disconnect(); // Stop observing once the image is loaded
      }
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect); // Assign the observer to the ref
    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect(); // Cleanup observer on unmount
      }
    };
  }, []);

  return (
    <div ref={imgRef} {...wrapperProps}>
      {isVisible ? (
        <img src={src} alt={alt} loading="lazy" className={effect} />
      ) : (
        <div style={{ minHeight: "200px" }} /> // Placeholder to maintain layout
      )}
    </div>
  );
};

export default LazyLoadImage;
