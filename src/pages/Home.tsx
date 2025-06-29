import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Shield, FileText, Users, Zap, CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '../store/useStore'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const Home: React.FC = () => {
  const { isConnected, userDID } = useStore()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Secure Digital Identity",
      subtitle: "Your Identity, Your Control",
      description: "Experience the future of digital identity management with blockchain-powered security and complete user control.",
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800",
      stats: { label: "Secure Identities", value: "10,000+" }
    },
    {
      title: "Verifiable Credentials",
      subtitle: "Instant Verification",
      description: "Store, manage, and share your certificates, degrees, and official documents with instant blockchain verification.",
      image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800",
      stats: { label: "Credentials Issued", value: "50,000+" }
    },
    {
      title: "Trusted Network",
      subtitle: "Global Recognition",
      description: "Connect with verified institutions worldwide for seamless credential verification and recognition.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      stats: { label: "Partner Institutions", value: "500+" }
    },
    {
      title: "Privacy First",
      subtitle: "Your Data, Your Rules",
      description: "Complete privacy control with zero-knowledge proofs and decentralized storage. No central authority can access your data.",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
      stats: { label: "Countries Supported", value: "25+" }
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const features = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Military-grade encryption with blockchain immutability ensures your identity is always secure.'
    },
    {
      icon: FileText,
      title: 'Digital Credentials',
      description: 'Store all your certificates, degrees, and documents in one secure, verifiable location.'
    },
    {
      icon: Users,
      title: 'Institutional Trust',
      description: 'Recognized by universities, employers, and government agencies worldwide.'
    },
    {
      icon: Zap,
      title: 'Instant Verification',
      description: 'Verify any credential in seconds using QR codes and blockchain technology.'
    }
  ]

  const benefits = [
    'Eliminate document fraud completely',
    'Instant verification anywhere, anytime',
    'Reduce paperwork by 90%',
    'Complete privacy and data control',
    'Global interoperability',
    'Cost-effective digital transformation'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 
                index < currentSlide ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/70"></div>
                
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="text-white">
                        <div className="mb-4">
                          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                            {slide.subtitle}
                          </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                          {slide.description}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                          {!isConnected ? (
                            <>
                              <Link to="/connect">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                                  Get Started Free
                                  <ArrowRight className="ml-2" size={20} />
                                </Button>
                              </Link>
                              <Button variant="ghost" size="lg" className="text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                                Watch Demo
                              </Button>
                            </>
                          ) : (
                            <Link to={userDID ? "/dashboard" : "/create-did"}>
                              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                                {userDID ? 'Go to Dashboard' : 'Create Your DID'}
                                <ArrowRight className="ml-2" size={20} />
                              </Button>
                            </Link>
                          )}
                        </div>

                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <div className="text-3xl font-bold">{slide.stats.value}</div>
                            <div className="text-blue-200 text-sm">{slide.stats.label}</div>
                          </div>
                          <div className="text-blue-200">
                            ✨ Demo Mode Available
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <button
            onClick={prevSlide}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Slide Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-5000 ease-linear"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DeID?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The most advanced decentralized identity platform trusted by institutions worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Transform Your Digital Experience
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join the digital identity revolution. DeID provides enterprise-grade security 
                with consumer-friendly simplicity, making digital identity management effortless.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {!isConnected ? (
                  <>
                    <Link to="/connect">
                      <Button size="lg" className="px-8 py-4">
                        Start Free Trial
                      </Button>
                    </Link>
                    <Button variant="secondary" size="lg" className="px-8 py-4">
                      Schedule Demo
                    </Button>
                  </>
                ) : (
                  <Link to={userDID ? "/dashboard" : "/create-did"}>
                    <Button size="lg" className="px-8 py-4">
                      {userDID ? 'Go to Dashboard' : 'Create Your DID'}
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-blue-100 mb-6">
                  Join thousands of users who have already embraced the future of digital identity.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</div>
                    <span>Connect your digital wallet</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</div>
                    <span>Create your decentralized identity</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</div>
                    <span>Start managing your credentials</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm text-blue-100 mb-2">🎯 Perfect for:</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>• Students</div>
                    <div>• Professionals</div>
                    <div>• Institutions</div>
                    <div>• Employers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The Future of Identity is Here
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join the decentralized identity revolution and take control of your digital presence today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {!isConnected ? (
              <>
                <Link to="/connect">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 font-semibold">
                    Get Started Now
                  </Button>
                </Link>
                <Button variant="ghost" size="lg" className="text-white border-2 border-white hover:bg-white hover:text-indigo-600 px-8 py-4 font-semibold">
                  View Demo
                </Button>
              </>
            ) : (
              <Link to={userDID ? "/dashboard" : "/create-did"}>
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 font-semibold">
                  Continue to Platform
                </Button>
              </Link>
            )}
          </div>

          <div className="text-indigo-200 text-sm">
            ✨ No credit card required • Free demo available • Enterprise solutions available
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home