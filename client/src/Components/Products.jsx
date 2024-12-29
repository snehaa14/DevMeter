import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import Card from './Card'; // Import Card Component

const Products = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const productsRef = useRef(null);
  const prevScrollY = useRef(0); // To track the previous scroll position

  // Intersection Observer to detect when the Products section comes into view or leaves the view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If entering view, check if scrolling up
          setAnimationStarted(!isScrollingUp);
        } else {
          // If leaving the view, animate the elements to collect
          setAnimationStarted(false);
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the component is visible
    );

    if (productsRef.current) {
      observer.observe(productsRef.current);
    }

    return () => {
      if (productsRef.current) {
        observer.unobserve(productsRef.current);
      }
    };
  }, [isScrollingUp]);

  // Handle scroll direction to detect scrolling up or down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > prevScrollY.current) {
        setIsScrollingUp(false); // Scrolling down
      } else {
        setIsScrollingUp(true); // Scrolling up
      }
      prevScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cardData = [
    {
      title: 'Sign up for an account',
      description: 'Create a new account on our platform to access all the features and coding sheets.',
    },
    {
      title: 'Explore our features',
      description: 'Discover the various tools and insights to improve your development skills.',
    },
    {
      title: 'Track your progress',
      description: 'Monitor your coding performance and see how you improve over time.',
    },
    {
      title: 'Join the community',
      description: 'Become part of a network of developers to share knowledge and grow together.',
    },
  ];

  return (
    <div
      ref={productsRef} // Reference for the Products section
      className="w-full flex items-center justify-between p-8 mt-32 mb-10"
    >
      {/* Left Side */}
      <div className="w-1/2 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-14">Discover Our Features</h2>
        <p className="text-lg text-gray-600 mb-6">
          DevMeter is an innovative platform designed to help developers track and enhance their coding performance across various platforms. With features like real-time performance metrics, coding challenges, and personalized progress tracking, DevMeter empowers users to stay on top of their coding journey. Whether you're a beginner or an experienced developer, DevMeter provides valuable insights to improve your skills and achieve your coding goals.
        </p>
        <Button text="Explore Now" type="primary" />
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex justify-center items-center flex-col gap-14">
        {/* Rendering Cards with Dynamic Text */}
        {cardData.map((card, index) => (
          <Card
            key={index}
            index={index}
            animationStarted={animationStarted}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
