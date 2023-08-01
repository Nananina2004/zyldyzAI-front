"use client"
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../../components/footer';
export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {
        if (window.scrollY > 20) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      });
    };
  }, []);
  const handleMenuToggle = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const controls = useAnimation();
  const [ref, inView] = useInView();

  function navigate(){
    router.push('sign-up')
  }
  function navigate_login(){
    router.push('/sign-in')
  }
  function lala() {
    const token = localStorage.getItem('token');
    if (token != null) {
      router.push('/chat'); 
    } else {
      router.push('/sign-up'); 
    }
  }

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <div className='w-full'>
      <nav className="px-6 h-20 text-white flex items-center justify-between w-full fixed top-0 left-0 z-50">
        <div className="px-2 h-full flex items-center justify-center">
          <p className="uppercase font-semibold tracking-widest text-lg">Zyldyz AI</p>
        </div>
        <div className="flex" />
        <div className="px-2 h-full hidden items-center justify-end lg:flex">
        <button className="justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 flex items-center gap-2"
        type="submit" onClick={navigate_login}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-in">
          <path d="M15 3c-.3 0-.5.1-.7.3l-7 7c-.4.4-.6 1-.6 1.7v2c0 1.1.9 2 2 2h1c.6 0 1-.4 1-1v-2c0-.6.2-1.2.6-1.7l7-7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-6.3 6.3-1.3-1.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l2 2c.2.2.5.3.7.3s.5-.1.7-.3l2-2c.4-.4.4-1 0-1.4l-1.3-1.3 6.3-6.3c.4-.4.4-1 0-1.4-.4-.2-.9-.2-1.3 0l-7 7c-.2.2-.3.5-.3.7s.1.5.3.7l7 7c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-7-7c-.4-.4-.6-1-.6-1.7s.2-1.3.6-1.7l7-7c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.5-.3-.7-.3z"></path>
        </svg>
        <span>Login</span>
      </button>

      <button className="justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 flex items-center gap-2"
        type="submit" onClick={navigate}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus">
          <path d="M16 16v-2m0 0-1 1m1-1 1-1m-8.586-1.414A5.98 5.98 0 0112 7c1.657 0 3 1.343 3 3 0 .737-.28 1.405-.737 1.914m-6.326-.839a9.004 9.004 0 018.53-5.177c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9c0-1.774.515-3.426 1.413-4.826"></path>
        </svg>
        <span>Register</span>
      </button>

        </div>
      </nav>


    <div className='m-0' style={{
      backgroundImage: 'url(/background.png)',
    }}>
      <div
        id="banner-section"
        className="flex items-center justify-center relative overflow-hidden pb-36 mx-20 sm:mx-10"
      >
        <div className="container">
          <div className="banner min-w-600 pt-40 sm:pt-30 text-left text-white">
          <h2
            className="banner__header text-2xl md:text-5xl lg:text-6xl leading-tight tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ wordWrap: "break-word" }}
          >
            <Balancer>ZyldyzAI: The Future of Astrology is Here</Balancer>
          </h2>

            <p
              className="banner__text mt-8 text-base md:text-lg text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Balancer>ZyldyzAI is your personal astrologer who will answer all your questions regarding astrology</Balancer>
            </p>
            <div className="banner-links-wrap mt-12">
            <a onClick={lala}>
              <div
                className="relative inline-flex items-center justify-start py-3 pl-4 m-5 pr-12 overflow-hidden font-semibold text-white transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
                style={{
                  borderRadius: '15px',
                  background: 'linear-gradient(169deg, rgba(246, 55, 250, 0.73) 0%, rgba(59, 99, 240, 0.72) 100%)',
                  boxShadow: '5px 5px 9px 2px rgba(0, 0, 0, 0.25) inset, 0px 0px 22px 3px rgba(46, 85, 160, 0.73)',
                }}
              >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Get started</span>
              </div>
            </a>
            </div>
          </div>
        </div>
        <div>
          <Image src={"/image.png"} 
            width={330}
            height={335}
            className=''
          />
        </div>
      </div>
      <div
  className="flex items-center justify-center flex-col min-h-screen animate-fade-down animate-duration-[2000ms] animate-delay-[15ms]"
  ref={ref}
>
  <div className="p-5 md:p-10 rounded-xl text-white">
    <div className="flex flex-col justify-center items-center text-center">
      <motion.div
        className="max-w-sm font-bold font-sans text-2xl md:text-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Services
      </motion.div>
      <motion.div
        className="font-light max-w-lg mt-3 md:mt-5 text-sm md:text-md"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Embark on an enchanting exploration of our offerings and unlock the wisdom of the cosmos.
      </motion.div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 md:mt-10">
        <motion.div
          className="rounded-xl p-4 md:p-8 flex justify-center md:justify-start items-center md:items-start space-x-4 md:space-x-6"
          style={{
            borderRadius: '33px',
            background: 'linear-gradient(180deg, #0300AE 0%, rgba(154, 11, 157, 0.00) 100%)',
            boxShadow: '1px 0px 61px 23px rgba(74, 74, 34, 0.25)',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center justify-center md:justify-start">
            <Image src="/natal.png" alt="natal image" width={30} height={35} className="mr-2 rounded-sm" />
          </div>
          <div className="flex flex-col text-center md:text-left">
            <div className="font-semibold text-lg">Natal Chart Analysis</div>
            <div className="text-sm font-light">Gain deep insights into your true self</div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl p-4 md:p-8 flex justify-center md:justify-start items-center md:items-start space-x-4 md:space-x-6"
          style={{
            borderRadius: '33px',
            background: 'linear-gradient(180deg, #0300AE 0%, rgba(154, 11, 157, 0.00) 100%)',
            boxShadow: '1px 0px 61px 23px rgba(74, 74, 34, 0.25)',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center justify-center md:justify-start">
            <Image src="/career.png" alt="career image" width={30} height={35} className="mr-2 rounded-sm" />
          </div>
          <div className="flex flex-col text-center md:text-left">
            <div className="font-semibold text-lg">Career Insights</div>
            <div className="text-sm font-light">Gain deep insights into your true self</div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl p-4 md:p-8 flex justify-center md:justify-start items-center md:items-start space-x-4 md:space-x-6"
          style={{
            borderRadius: '33px',
            background: 'linear-gradient(180deg, #0300AE 0%, rgba(154, 11, 157, 0.00) 100%)',
            boxShadow: '1px 0px 61px 23px rgba(74, 74, 34, 0.25)',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center justify-center md:justify-start">
            <Image src="/yearly.png" alt="yearly image" width={30} height={35} className="mr-2 rounded-sm" />
          </div>
          <div className="flex flex-col text-center md:text-left">
            <div className="font-semibold text-lg">Yearly Forecast</div>
            <div className="text-sm font-light">Gain deep insights into your true self</div>
          </div>
        </motion.div>
      </div>
          </div>
        </div>
      <Footer backgroundImage="/background.png" />
    </div>

    </div>
  )





}


