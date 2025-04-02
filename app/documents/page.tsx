"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Calendar, ArrowRight, Loader2 } from "lucide-react"
import { getUserDocuments, type ProcessedDocument } from "@/lib/document-service"

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<ProcessedDocument[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<ProcessedDocument[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterLanguage, setFilterLanguage] = useState("")
  const [filterType, setFilterType] = useState("")

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const docs = await getUserDocuments()
        setDocuments(docs)
        setFilteredDocuments(docs)
      } catch (error) {
        console.error("Failed to fetch documents:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  useEffect(() => {
    let filtered = [...documents]

    if (searchQuery) {
      filtered = filtered.filter(
        (doc) =>
          doc.metadata.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.processedText.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (filterLanguage) {
      filtered = filtered.filter((doc) => doc.metadata.language === filterLanguage)
    }

    if (filterType) {
      filtered = filtered.filter((doc) => doc.metadata.type === filterType)
    }

    setFilteredDocuments(filtered)
  }, [searchQuery, filterLanguage, filterType, documents])

  const clearFilters = () => {
    setSearchQuery("")
    setFilterLanguage("")
    setFilterType("")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">My Documents</h1>
        <Button asChild>
          <Link href="/upload">Upload New Document</Link>
        </Button>
      </div>

      <div className="bg-muted rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Select value={filterLanguage} onValueChange={setFilterLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="bengali">Bengali</SelectItem>
              <SelectItem value="tamil">Tamil</SelectItem>
              <SelectItem value="telugu">Telugu</SelectItem>
              <SelectItem value="marathi">Marathi</SelectItem>
              <SelectItem value="gujarati">Gujarati</SelectItem>
              <SelectItem value="english">English</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="birth_certificate">Birth Certificate</SelectItem>
              <SelectItem value="marriage_certificate">Marriage Certificate</SelectItem>
              <SelectItem value="property_deed">Property Deed</SelectItem>
              <SelectItem value="legal_contract">Legal Contract</SelectItem>
              <SelectItem value="historical_manuscript">Historical Manuscript</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(searchQuery || filterLanguage || filterType) && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredDocuments.length} of {documents.length} documents
            </p>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <img
                      src={doc.originalUrl || "/placeholder.svg"}
                      alt={doc.metadata.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-2 truncate">{doc.metadata.name}</h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {doc.metadata.language}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        {doc.metadata.type.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(doc.dateProcessed).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{doc.processedText}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/documents/${doc.id}`}>
                        View Document <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Documents Found</h2>
              <p className="text-muted-foreground mb-4">
                {documents.length > 0
                  ? "No documents match your current filters."
                  : "You haven't uploaded any documents yet."}
              </p>
              <Button asChild>
                <Link href="/upload">Upload Your First Document</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="list">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredDocuments.length > 0 ? (
            <div className="space-y-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-32 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={doc.originalUrl || "/placeholder.svg"}
                          alt={doc.metadata.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                          <h2 className="text-xl font-semibold">{doc.metadata.name}</h2>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {doc.metadata.language}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                              {doc.metadata.type.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{doc.processedText}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{new Date(doc.dateProcessed).toLocaleDateString()}</span>
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/documents/${doc.id}`}>View Document</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Documents Found</h2>
              <p className="text-muted-foreground mb-4">
                {documents.length > 0
                  ? "No documents match your current filters."
                  : "You haven't uploaded any documents yet."}
              </p>
              <Button asChild>
                <Link href="/upload">Upload Your First Document</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

