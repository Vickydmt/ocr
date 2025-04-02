import { Card, CardContent } from "@/components/ui/card"
import { FileText, Users, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About DocuDigitize</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our mission is to preserve history and make it accessible to everyone through technology
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            DocuDigitize was founded with a simple yet powerful mission: to bridge the gap between historical documents
            and modern accessibility. We believe that history belongs to everyone, and technology should be used to
            preserve and share our collective heritage.
          </p>
          <p className="text-lg mb-4">
            By digitizing handwritten historical documents in regional languages, we're not just preserving them—we're
            making them searchable, accessible, and relevant for future generations.
          </p>
        </div>
        <div className="bg-muted rounded-lg p-8 flex justify-center">
          <img src="/placeholder.svg?height=300&width=400" alt="Our mission illustration" className="rounded-lg" />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why We Do This</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Preservation</h3>
                <p className="text-muted-foreground">
                  Many historical documents are deteriorating with time. By digitizing them, we ensure that valuable
                  information isn't lost forever.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  Digitized documents can be accessed by anyone, anywhere, breaking down geographical and physical
                  barriers to historical knowledge.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cultural Heritage</h3>
                <p className="text-muted-foreground">
                  By supporting regional languages, we help preserve linguistic and cultural diversity that might
                  otherwise be lost in the digital age.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img src="/placeholder.svg?height=300&width=400" alt="Our team illustration" className="rounded-lg" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg mb-4">
              DocuDigitize brings together experts in artificial intelligence, historical preservation, linguistics, and
              software development. Our diverse team is united by a passion for making history accessible through
              technology.
            </p>
            <p className="text-lg mb-4">
              We collaborate with libraries, archives, universities, and cultural institutions to ensure our platform
              meets the needs of both document custodians and researchers.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-primary/5 rounded-lg p-6">
            <div className="text-4xl font-bold text-primary mb-2">500K+</div>
            <div className="text-muted-foreground">Documents Digitized</div>
          </div>

          <div className="bg-primary/5 rounded-lg p-6">
            <div className="text-4xl font-bold text-primary mb-2">11</div>
            <div className="text-muted-foreground">Regional Languages</div>
          </div>

          <div className="bg-primary/5 rounded-lg p-6">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Partner Institutions</div>
          </div>

          <div className="bg-primary/5 rounded-lg p-6">
            <div className="text-4xl font-bold text-primary mb-2">10K+</div>
            <div className="text-muted-foreground">Researchers Supported</div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg h-24">
            <div className="text-xl font-semibold text-center text-muted-foreground">National Archives</div>
          </div>

          <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg h-24">
            <div className="text-xl font-semibold text-center text-muted-foreground">Digital Library</div>
          </div>

          <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg h-24">
            <div className="text-xl font-semibold text-center text-muted-foreground">Heritage Foundation</div>
          </div>

          <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg h-24">
            <div className="text-xl font-semibold text-center text-muted-foreground">University Research</div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Whether you're a researcher, archivist, developer, or simply passionate about preserving history, there are
          many ways to get involved with DocuDigitize.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Contact Us
          </a>
          <a
            href="/upload"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Start Digitizing
          </a>
        </div>
      </div>
    </div>
  )
}

