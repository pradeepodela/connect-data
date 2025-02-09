import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Users, Building, Briefcase, ArrowRight, Filter } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ConnectFounders
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="#search" className="text-sm font-medium hover:text-primary transition-colors">
              Search
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          <div className="flex space-x-2">
            <Button variant="outline">Log in</Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-br from-primary/10 via-white to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Connect with Innovative Founders & Decision Makers
              </h1>
              <p className="text-xl mb-8 text-gray-600">
                Access verified contact information of industry leaders. Drive meaningful B2B relationships and
                accelerate your business growth.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <section id="search" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Find Your Next Business Connection</h2>
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-4 mb-6">
                <Input placeholder="Search by name, company, or industry" className="flex-grow" />
                <Button>
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> Advanced Filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Innovators</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Sarah Johnson", role: "CEO", company: "TechInnovate", industry: "AI & Machine Learning" },
                { name: "Michael Chen", role: "CTO", company: "DataDrive", industry: "Big Data Analytics" },
                {
                  name: "Emily Rodriguez",
                  role: "Founder",
                  company: "GreenTech Solutions",
                  industry: "Renewable Energy",
                },
              ].map((profile, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 mx-auto"></div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{profile.name}</h3>
                  <p className="text-gray-600 text-center mb-2">
                    {profile.role} at {profile.company}
                  </p>
                  <p className="text-sm text-gray-500 text-center">{profile.industry}</p>
                  <Button variant="outline" className="w-full mt-4">
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg">
                Explore More Profiles <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose ConnectFounders?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Verified Contacts",
                  description: "Access accurate and up-to-date contact information of key decision-makers.",
                  icon: Users,
                },
                {
                  title: "Industry Diversity",
                  description:
                    "Connect with leaders across various sectors, from tech startups to established enterprises.",
                  icon: Building,
                },
                {
                  title: "Targeted Networking",
                  description: "Find the right connections to drive your business forward and close deals faster.",
                  icon: Briefcase,
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 rounded-full p-4 mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Expand Your Network?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join ConnectFounders today and start building meaningful B2B relationships with industry leaders.
            </p>
            <Button size="lg" variant="secondary">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">About ConnectFounders</h2>
              <p className="text-xl mb-8 text-gray-600">
                ConnectFounders is the premier platform for businesses to connect with innovative founders, technology
                leaders, and key decision-makers. Our mission is to facilitate meaningful B2B relationships that drive
                growth and innovation across industries.
              </p>
              <Button variant="outline">Learn More About Us</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ConnectFounders</h3>
              <p className="text-sm text-gray-400">Connecting businesses with innovative leaders.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} ConnectFounders. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

