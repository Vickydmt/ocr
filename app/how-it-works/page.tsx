import { Card, CardContent } from "@/components/ui/card"
import { FileText, Upload, Search, Languages, Database, Zap } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">How It Works</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our platform uses advanced AI and OCR technology to digitize handwritten historical documents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Advanced OCR Technology</h2>
          <p className="text-lg mb-4">
            Our platform uses state-of-the-art Optical Character Recognition (OCR) technology specifically trained to
            recognize handwritten text in various regional languages.
          </p>
          <p className="text-lg mb-4">
            Unlike conventional OCR systems that struggle with handwritten documents, our solution employs deep learning
            models trained on thousands of historical documents to achieve high accuracy even with challenging scripts
            and deteriorated documents.
          </p>
        </div>
        <div className="bg-muted rounded-lg p-8 flex justify-center">
          <img src="/placeholder.svg?height=300&width=400" alt="OCR technology illustration" className="rounded-lg" />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Process</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Document Upload</h3>
                <p className="text-muted-foreground">
                  Upload scanned historical documents in various formats including PDF, JPG, and PNG. Our system accepts
                  documents of any quality, though better scans yield better results.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">OCR Processing</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes the document, enhances image quality, identifies the script and language, and extracts
                  text with high accuracy even from handwritten documents.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Languages className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Translation & Access</h3>
                <p className="text-muted-foreground">
                  View, search, and translate the digitized text in multiple regional languages. Our platform makes
                  historical documents accessible to everyone.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Key Technologies</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Neural OCR</h3>
                <p className="text-sm text-muted-foreground">
                  Deep learning models specifically trained on handwritten documents in regional languages.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Image Enhancement</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms to improve document quality before processing, enhancing OCR accuracy.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Languages className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Multilingual Support</h3>
                <p className="text-sm text-muted-foreground">
                  Support for multiple regional languages and scripts, with translation capabilities.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Encrypted storage for your historical documents with easy access and management.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Technical Specifications</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary rounded-full p-1 mr-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>
                  <strong>OCR Engine:</strong> Custom-trained Tesseract with neural network enhancements
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary rounded-full p-1 mr-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>
                  <strong>Supported Languages:</strong> Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada,
                  Malayalam, Punjabi, Sanskrit, English
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary rounded-full p-1 mr-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>
                  <strong>File Formats:</strong> PDF, JPG, JPEG, PNG, TIFF
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary rounded-full p-1 mr-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>
                  <strong>Maximum File Size:</strong> 50MB per document
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary rounded-full p-1 mr-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>
                  <strong>Processing Time:</strong> 1-5 minutes per page depending on complexity
                </span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Technical specifications illustration"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Digitize Your Historical Documents?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Start preserving history and making it accessible to everyone today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/upload"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Upload Document
          </a>
          <a
            href="/documents"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Browse Documents
          </a>
        </div>
      </div>
    </div>
  )
}

