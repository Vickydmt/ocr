"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, ArrowLeft, Download, Share2, Edit, Eye, EyeOff } from "lucide-react"
import { getDocumentById, translateText, type ProcessedDocument } from "@/lib/document-service"

export default function DocumentViewPage() {
  const params = useParams()
  const documentId = params.id as string

  const [document, setDocument] = useState<ProcessedDocument | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [translatedText, setTranslatedText] = useState<string | null>(null)
  const [targetLanguage, setTargetLanguage] = useState("english")
  const [isTranslating, setIsTranslating] = useState(false)
  const [showOriginal, setShowOriginal] = useState(true)

  useEffect(() => {
    async function fetchDocument() {
      try {
        const doc = await getDocumentById(documentId)
        setDocument(doc)
      } catch (error) {
        console.error("Failed to fetch document:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocument()
  }, [documentId])

  const handleTranslate = async () => {
    if (!document) return

    setIsTranslating(true)
    try {
      const translated = await translateText(document.processedText, document.metadata.language, targetLanguage)
      setTranslatedText(translated)
    } catch (error) {
      console.error("Translation error:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!document) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Document Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The document you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/documents">Back to Documents</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Button variant="outline" size="sm" asChild className="mb-2">
            <Link href="/documents">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Documents
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{document.metadata.name}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="view">
            <TabsList className="mb-4">
              <TabsTrigger value="view">View</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="translation">Translation</TabsTrigger>
            </TabsList>

            <TabsContent value="view">
              <Card>
                <CardContent className="p-6">
                  <div className="bg-muted rounded-lg overflow-hidden mb-4">
                    <img
                      src={document.originalUrl || "/placeholder.svg"}
                      alt={document.metadata.name}
                      className="w-full object-contain max-h-[600px]"
                    />
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Original Document</h2>
                    <div className="text-sm text-muted-foreground">Page 1 of {document.pages}</div>
                  </div>

                  <div className="flex justify-center gap-2 mt-4">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled={document.pages <= 1}>
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="text">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Extracted Text</h2>
                    <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Confidence: {document.confidence}%
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4 min-h-[300px] whitespace-pre-line font-mono text-sm">
                    {document.processedText}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="translation">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h2 className="text-xl font-semibold">Translation</h2>
                    <div className="flex items-center gap-2">
                      <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Target Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="bengali">Bengali</SelectItem>
                          <SelectItem value="tamil">Tamil</SelectItem>
                          <SelectItem value="telugu">Telugu</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleTranslate} disabled={isTranslating}>
                        {isTranslating ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Translating...
                          </>
                        ) : (
                          "Translate"
                        )}
                      </Button>
                    </div>
                  </div>

                  {translatedText && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Translation Result</h3>
                        <Button variant="ghost" size="sm" onClick={() => setShowOriginal(!showOriginal)}>
                          {showOriginal ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-2" />
                              Hide Original
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-2" />
                              Show Original
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {showOriginal && (
                          <div className="bg-muted/30 rounded-lg p-4 whitespace-pre-line">
                            <div className="text-xs text-muted-foreground mb-2">
                              Original ({document.metadata.language}):
                            </div>
                            {document.processedText}
                          </div>
                        )}

                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 whitespace-pre-line">
                          <div className="text-xs text-muted-foreground mb-2">Translated ({targetLanguage}):</div>
                          {translatedText}
                        </div>
                      </div>
                    </div>
                  )}

                  {!translatedText && !isTranslating && (
                    <div className="text-center py-12 bg-muted/30 rounded-lg">
                      <p className="text-muted-foreground mb-4">
                        Select a target language and click Translate to see the translation.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Document Details</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Document Type</h3>
                  <p>{document.metadata.type.replace("_", " ")}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Language</h3>
                  <p>{document.metadata.language}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Date Processed</h3>
                  <p>{new Date(document.dateProcessed).toLocaleDateString()}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Pages</h3>
                  <p>{document.pages}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">OCR Confidence</h3>
                  <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${document.confidence}%` }}></div>
                  </div>
                  <p className="text-xs text-right mt-1">{document.confidence}%</p>
                </div>

                {document.metadata.date && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Document Date</h3>
                    <p>{new Date(document.metadata.date).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              <div className="border-t mt-6 pt-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download as PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download as Text
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Metadata
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

