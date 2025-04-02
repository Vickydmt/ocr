"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload, FileText, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { uploadDocument } from "@/lib/document-service"
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [documentName, setDocumentName] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [language, setLanguage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      if (!documentName) {
        setDocumentName(e.target.files[0].name.split(".")[0])
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setUploadError("Please select a file to upload")
      return
    }

    if (!documentName) {
      setUploadError("Please provide a document name")
      return
    }

    if (!documentType) {
      setUploadError("Please select a document type")
      return
    }

    if (!language) {
      setUploadError("Please select the document language")
      return
    }

    setIsUploading(true)
    setUploadError(null)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 5
        })
      }, 200)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Call the upload service
      await uploadDocument(file, {
        name: documentName,
        type: documentType,
        language,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)
      setUploadSuccess(true)

      // Reset form after successful upload
      setTimeout(() => {
        setActiveTab("processing")
      }, 1000)
    } catch (error) {
      setUploadError("Failed to upload document. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Upload Historical Document</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="processing" disabled={!uploadSuccess}>
              Processing
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!uploadSuccess}>
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="document-upload">Document File</Label>
                    <div
                      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => document.getElementById("document-upload")?.click()}
                    >
                      {file ? (
                        <div className="flex flex-col items-center">
                          <FileText className="h-10 w-10 text-primary mb-2" />
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Drag and drop your file here or click to browse</p>
                          <p className="text-xs text-muted-foreground mt-1">Supports PDF, JPG, PNG (Max 20MB)</p>
                        </div>
                      )}
                      <Input
                        id="document-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document-name">Document Name</Label>
                    <Input
                      id="document-name"
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                      placeholder="Enter document name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="document-type">Document Type</Label>
                      <Select value={documentType} onValueChange={setDocumentType}>
                        <SelectTrigger id="document-type">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="birth_certificate">Birth Certificate</SelectItem>
                          <SelectItem value="marriage_certificate">Marriage Certificate</SelectItem>
                          <SelectItem value="property_deed">Property Deed</SelectItem>
                          <SelectItem value="legal_contract">Legal Contract</SelectItem>
                          <SelectItem value="historical_manuscript">Historical Manuscript</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="document-language">Primary Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="document-language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="bengali">Bengali</SelectItem>
                          <SelectItem value="tamil">Tamil</SelectItem>
                          <SelectItem value="telugu">Telugu</SelectItem>
                          <SelectItem value="marathi">Marathi</SelectItem>
                          <SelectItem value="gujarati">Gujarati</SelectItem>
                          <SelectItem value="kannada">Kannada</SelectItem>
                          <SelectItem value="malayalam">Malayalam</SelectItem>
                          <SelectItem value="punjabi">Punjabi</SelectItem>
                          <SelectItem value="sanskrit">Sanskrit</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {uploadError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{uploadError}</AlertDescription>
                    </Alert>
                  )}

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Upload Document"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processing">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                  <h2 className="text-2xl font-semibold mb-2">Processing Your Document</h2>
                  <p className="text-muted-foreground mb-6">
                    Our AI is analyzing your document. This may take a few minutes.
                  </p>

                  <div className="space-y-4 max-w-md mx-auto">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>OCR Processing</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Text Extraction</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Language Processing</span>
                        <span>30%</span>
                      </div>
                      <Progress value={30} />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-8">
                    You can close this page and come back later. We'll notify you when processing is complete.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-4">
                  <h2 className="text-2xl font-semibold mb-6">Document Processing Complete</h2>

                  <div className="flex justify-center mb-6">
                    <Button onClick={() => (window.location.href = "/documents/123")}>View Document Results</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Document Details</h3>
                      <dl className="space-y-2">
                        <div className="flex">
                          <dt className="w-32 font-medium">Name:</dt>
                          <dd>{documentName}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 font-medium">Type:</dt>
                          <dd>{documentType.replace("_", " ")}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 font-medium">Language:</dt>
                          <dd>{language}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 font-medium">Pages:</dt>
                          <dd>3</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Processing Results</h3>
                      <dl className="space-y-2">
                        <div className="flex">
                          <dt className="w-32 font-medium">OCR Quality:</dt>
                          <dd>High (92%)</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 font-medium">Words:</dt>
                          <dd>1,245</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 font-medium">Date:</dt>
                          <dd>April 2, 2025</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

