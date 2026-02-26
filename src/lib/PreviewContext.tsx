"use client";

import { createContext, useContext } from "react";

const PreviewContext = createContext(false);

export const PreviewProvider = PreviewContext.Provider;
export const usePreview = () => useContext(PreviewContext);
