"use client"
import { createContext, useEffect, useState } from "react";

const HeaderContext = createContext(null)

const HeaderState = (children: any) => {
    const [isHidden, setIsHidden] = useState(false)
    let lastScrollTop = 0;
    const handleScroll = () => {
        const st = window.scrollY || document.documentElement.scrollTop
        if (Math.abs(lastScrollTop - st) <= 5) return
        setIsHidden(st > lastScrollTop && st > 50);
        lastScrollTop = st <= 0 ? 0 : st;
    }


    return (
        <HeaderContext.Provider value={{ isHidden, handleScroll }}></HeaderContext.Provider>

    )
}
export { HeaderState, HeaderContext }