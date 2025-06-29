import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import QRScanner from '../components/QRScanner'

const Verifier: React.FC = () => {
  const { verifyCredential } = useStore()
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [manualHash, setManualHash] = useState('')
  const [activeTab, setActiveTab] = useState<'scanner' | 'manual'>('scanner')

  const handleVerifyCredential = async (credentialData: any) => {
    setLoading(true)
    try {
      const result = await verifyCredential(credentialData.credentialHash)
      
      setVerificationResult({
        isValid: result.isValid,
        credential: result.credential || credentialData,
        verifiedAt: new Date().toISOString(),
        status: result.isValid ? 'Valid' : 'Invalid/Revoked'
      })
    } catch (error) {
      console.error('Error verifying credential:', error)
      setVerificationResult({
        isValid: false,
        error: 'Verification failed',
        status: 'Error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleQRScan = (result: string) => {
    try {
      const credentialData = JSON.parse(result)
      if (credentialData.type === 'verifiable-credential') {
        handleVerifyCredential(credentialData)
      } else {
        setVerificationResult({
          isValid: false,
          error: 'Invalid QR code format',
          status: 'Error'
        })
      }
    } catch (error) {
      setVerificationResult({
        isValid: false,
        error: 'Invalid QR code data',
        status: 'Error'
      })
    }
  }

  const handleManualVerification = () => {
    if (!manualHash.trim()) return

    const mockCredentialData = {
      credentialHash: manualHash.trim(),
      type: 'verifiable-credential'
    }
    
    handleVerifyCredential(mockCredentialData)
  }

  const resetVerification = () => {
    setVerificationResult(null)
    setManualHash('')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Credential Verifier
            </h1>
            <p className="text-gray-600">
              Verify the authenticity of verifiable credentials
            </p>
            <div className="mt-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
              Demo Mode - Local Verification
            </div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🔍</span>
          </div>
        </div>
      </div>

      {/* Verification Methods */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'scanner'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            QR Scanner
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'manual'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Manual Hash
          </button>
        </div>

        {activeTab === 'scanner' && (
          <div>
            <QRScanner
              onScan={handleQRScan}
              onError={(error) => console.error('QR Scanner error:', error)}
            />
          </div>
        )}

        {activeTab === 'manual' && (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔤</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manual Verification</h3>
              <p className="text-gray-600 text-sm">
                Enter the credential hash to verify its authenticity
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="credentialHash" className="block text-sm font-medium text-gray-700 mb-2">
                  Credential Hash
                </label>
                <input
                  type="text"
                  id="credentialHash"
                  value={manualHash}
                  onChange={(e) => setManualHash(e.target.value)}
                  placeholder="Enter credential hash... (try: hash_education_degree_2024)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                />
              </div>
              <button
                onClick={handleManualVerification}
                disabled={!manualHash.trim() || loading}
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {loading ? 'Verifying...' : 'Verify Credential'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Verification Result */}
      {verificationResult && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              verificationResult.isValid 
                ? 'bg-green-100' 
                : 'bg-red-100'
            }`}>
              <span className="text-3xl">
                {verificationResult.isValid ? '✅' : '❌'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verification Result
            </h2>
            <p className={`text-lg font-medium ${
              verificationResult.isValid ? 'text-green-600' : 'text-red-600'
            }`}>
              {verificationResult.status}
            </p>
          </div>

          {verificationResult.credential && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Credential Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {verificationResult.credential.credentialType && (
                  <div>
                    <span className="text-sm text-gray-600">Type:</span>
                    <p className="font-medium text-gray-900">{verificationResult.credential.credentialType}</p>
                  </div>
                )}
                {verificationResult.credential.issuer && (
                  <div>
                    <span className="text-sm text-gray-600">Issuer:</span>
                    <p className="font-mono text-sm text-gray-900 truncate">{verificationResult.credential.issuer}</p>
                  </div>
                )}
                {verificationResult.credential.subject && (
                  <div>
                    <span className="text-sm text-gray-600">Subject:</span>
                    <p className="font-mono text-sm text-gray-900 truncate">{verificationResult.credential.subject}</p>
                  </div>
                )}
                {verificationResult.credential.issuedAt && (
                  <div>
                    <span className="text-sm text-gray-600">Issued:</span>
                    <p className="text-gray-900">
                      {new Date(verificationResult.credential.issuedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {verificationResult.credential.expiresAt && (
                  <div>
                    <span className="text-sm text-gray-600">Expires:</span>
                    <p className="text-gray-900">
                      {new Date(verificationResult.credential.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-sm text-gray-600">Verified At:</span>
                  <p className="text-gray-900">
                    {new Date(verificationResult.verifiedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {verificationResult.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <span className="text-red-500 mr-2">⚠️</span>
                <p className="text-red-700">{verificationResult.error}</p>
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={resetVerification}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Verify Another Credential
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Verify</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📱</span>
              QR Code Verification
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Click "Start Scanning" to activate the demo scanner</li>
              <li>Use "Scan Sample" to test with sample credential</li>
              <li>Or paste QR data in the input field</li>
              <li>View the verification result and credential details</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">🔤</span>
              Manual Hash Verification
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Switch to the "Manual Hash" tab</li>
              <li>Enter a credential hash (try: hash_education_degree_2024)</li>
              <li>Click "Verify Credential" to check authenticity</li>
              <li>Review the verification status and details</li>
            </ol>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <span className="text-blue-500 mr-2">ℹ️</span>
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Demo Verification Process:</p>
              <p>
                In demo mode, the system checks credentials against locally stored data. 
                In a real application, this would verify against blockchain records and 
                validate issuer signatures. Valid credentials show as "Valid" while 
                revoked or unknown credentials show as "Invalid/Revoked".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verifier