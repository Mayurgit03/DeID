import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Wallet, ArrowRight, CheckCircle } from 'lucide-react'
import { useStore } from '../store/useStore'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const Connect: React.FC = () => {
  const navigate = useNavigate()
  const { connectWallet, isLoading, isConnected } = useStore()

  const handleConnect = async () => {
    await connectWallet()
    navigate('/create-did')
  }

  if (isConnected) {
    navigate('/dashboard')
    return null
  }

  const features = [
    'Secure blockchain-based identity',
    'Complete control over your data',
    'Instant credential verification',
    'Privacy-first approach',
    'Interoperable across platforms'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect your digital wallet to start managing your decentralized identity and credentials securely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connection Card */}
          <Card className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Demo Mode Available
              </h2>
              <p className="text-gray-600">
                Experience DeID without any blockchain setup. Perfect for testing and demonstration.
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleConnect}
                loading={isLoading}
                size="lg"
                className="w-full"
              >
                {isLoading ? 'Connecting...' : 'Connect Demo Wallet'}
                <ArrowRight className="ml-2" size={20} />
              </Button>
              
              <div className="text-sm text-gray-500">
                No actual wallet required - this is a demonstration
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <div>• Simulate wallet connection</div>
                <div>• Create your decentralized identity</div>
                <div>• Receive sample credentials</div>
                <div>• Explore all platform features</div>
              </div>
            </div>
          </Card>

          {/* Features Card */}
          <Card>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why DeID?
            </h3>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Supported in Demo Mode:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>✓ Identity Creation</div>
                <div>✓ Credential Management</div>
                <div>✓ QR Code Generation</div>
                <div>✓ Verification System</div>
                <div>✓ NFT Identity Cards</div>
                <div>✓ Social Recovery</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Security Notice */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <div className="flex items-start">
            <Shield className="text-yellow-600 mr-3 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">
                Demo Mode Security Notice
              </h3>
              <p className="text-yellow-800 text-sm">
                This is a demonstration environment. In production, DeID would integrate with real blockchain networks 
                and require actual wallet connections for enhanced security. All data in demo mode is stored locally 
                in your browser and is not persistent across devices.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Connect