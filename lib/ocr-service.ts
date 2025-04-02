"use client"

import { createWorker } from "tesseract.js"

export interface OCRResult {
  text: string
  confidence: number
  words: { text: string; confidence: number; bbox: { x0: number; y0: number; x1: number; y1: number } }[]
}

export async function performOCR(imageData: string | Blob, language = "eng"): Promise<OCRResult> {
  try {
    // Map our language codes to Tesseract language codes
    const languageMap: Record<string, string> = {
      hindi: "hin",
      bengali: "ben",
      tamil: "tam",
      telugu: "tel",
      marathi: "mar",
      gujarati: "guj",
      kannada: "kan",
      malayalam: "mal",
      punjabi: "pan",
      sanskrit: "san",
      english: "eng",
    }

    const tesseractLang = languageMap[language] || "eng"

    // Initialize worker with the appropriate language
    const worker = await createWorker(tesseractLang)

    // Recognize text in the image
    const result = await worker.recognize(imageData)

    // Terminate worker to free resources
    await worker.terminate()

    return {
      text: result.data.text,
      confidence: result.data.confidence,
      words: result.data.words.map((word) => ({
        text: word.text,
        confidence: word.confidence,
        bbox: word.bbox,
      })),
    }
  } catch (error) {
    console.error("OCR processing error:", error)
    throw new Error("Failed to process document with OCR")
  }
}

export async function enhanceImage(imageData: string | Blob): Promise<Blob> {
  // In a real implementation, this would use image processing libraries
  // to enhance the image quality before OCR processing

  // For demo purposes, we'll just return the original image
  if (typeof imageData === "string") {
    const response = await fetch(imageData)
    return await response.blob()
  }

  return imageData
}

export async function detectLanguage(text: string): Promise<string> {
  // In a real implementation, this would use language detection APIs
  // For demo purposes, we'll return a mock result

  // Simple mock implementation based on character patterns
  const patterns = {
    hindi: /[\u0900-\u097F]/,
    bengali: /[\u0980-\u09FF]/,
    tamil: /[\u0B80-\u0BFF]/,
    telugu: /[\u0C00-\u0C7F]/,
    marathi: /[\u0900-\u097F]/, // Uses Devanagari script like Hindi
    gujarati: /[\u0A80-\u0AFF]/,
    kannada: /[\u0C80-\u0CFF]/,
    malayalam: /[\u0D00-\u0D7F]/,
    punjabi: /[\u0A00-\u0A7F]/,
    sanskrit: /[\u0900-\u097F]/, // Uses Devanagari script
  }

  for (const [language, pattern] of Object.entries(patterns)) {
    if (pattern.test(text)) {
      return language
    }
  }

  return "english" // Default fallback
}

