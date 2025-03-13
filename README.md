# MealPlaterz (Share Food through Community Project)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Live Demo

- [MealPlaterz on Firebase](https://foodshare-3bbc0.web.app)
- [MealPlaterz on Netlify](https://mealplaterz.netlify.app)

## Table of Contents

- [Description](#description)
- [Features](#features)
- [New Features](#new-features)
- [Packages Used](#packages-used)
- [Future Enhancements](#future-enhancements)

## Description

MealPlaterz streamlines food donation by providing a platform to schedule, track, and request food donations. Only users who complete food donations can leave reviews. Stripe is integrated for premium membership, which includes free food delivery.

## Features

1. **User Authentication:**

   - Sign up with email and password.
   - Login securely using email credentials.
   - Password validation during registration.

2. **Navigation and Accessibility:**

   - Secure private routes and redirects.
   - Forgot password functionality.
   - Seamless navigation for logged-in users.

3. **User Interface:**

   - Responsive design across devices.
   - AOS for enhanced user experience.
   - Skeleton loaders for smooth content loading.

4. **Food Sharing Management:**

   - Each food listing includes an expiration date and time with conditions.
   - Post, manage, and update food listings.
   - Search functionality by food type or location.

5. **User-Specific Features:**

   - Manage food listings and availability.
   - Update profile information and preferences.

6. **Advanced Functionalities:**

   - Secure JWT authentication for user authorization.
   - Interactive data visualizations with React CountUp and Google Charts.
   - Booking status management and prevention of duplicate listings.
   - Pagination for efficient search and results display.

## New Features

1. **Payment for Premium Membership:**

   - Users can purchase premium membership for enhanced features.
   - Payment form for purchasing premium membership using Tailwind CSS for styling.
   - Continuous check for premium membership expiration to ensure up-to-date access.

2. **Improved Food Listing Management:**

   - Expired foods are automatically filtered out by default.
   - Option to display expired foods, sorted to appear last.
   - Real-time updates on food availability and expiration using advanced date handling libraries.

3. **Enhanced Profile Page:**

   - Redesigned for a professional and colorful appearance.
   - Includes countdown for premium membership and easy access to profile actions.
   - Mobile responsiveness for improved usability.

## Packages Used

### Dependencies

- [aos](https://www.npmjs.com/package/aos)
- [axios](https://www.npmjs.com/package/axios)
- [firebase](https://www.npmjs.com/package/firebase)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [@stripe/stripe-js](https://www.npmjs.com/package/@stripe/stripe-js)
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query)
- [@stripe/react-stripe-js](https://www.npmjs.com/package/@stripe/react-stripe-js)
- [@headlessui/react](https://www.npmjs.com/package/@headlessui/react)
- [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner)
- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async)
- [sonner](https://www.npmjs.com/package/sonner)
- [swiper](https://www.npmjs.com/package/swiper)

### Dev Dependencies

- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom)
- [daisyui](https://daisyui.com/docs/install)
- [tailwindcss](https://tailwindcss.com/docs/guides/vite)
- [vite](https://www.npmjs.com/package/vite)

## Future Enhancements

1. **Enhanced Reporting and Analytics:**

   - Advanced data visualizations for donation trends.
   - Reports on user activity and food availability.

2. **Community Features:**

   - Forum for users to discuss food-sharing tips.
   - Collaborative events for reducing food waste.

3. **Mobile App Integration:**

   - Dedicated mobile app for on-the-go food sharing.
   - Push notifications for updates and new donations.

