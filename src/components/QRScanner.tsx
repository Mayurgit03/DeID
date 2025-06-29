import React, { useState } from 'react'
import { Camera, Scan } from 'lucide-react'
import Button from './ui/Button'
import Card from './ui/Card'

interface QRScannerProps {
  onScan: (result: string) => void
  onError?: (error: string) => void
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [mockInput, setMockInput] = useState('')

  const startScanning = () => {
    setIsScanning(true)
  }

  const stopScanning = () => {
    setIsScanning(false)
  }

  const simulateScan = () => {
    if (mockInput.trim()) {
      onScan(mockInput.trim())
      setMockInput('')
      setIsScanning(false)
    } else if (onError) {
      onError('Input is empty. Please provide QR data to scan.')
    }
  }

  const scanSampleCredential = () => {
    const sampleCredential = JSON.stringify({
      type: 'verifiable-credential',
      credentialHash: 'hash_education_degree_2024',
      issuer: '0x1234567890123456789012345678901234567890',
      subject: '0x742d35Cc6634C0532925a3b8D4C9db96590c6C87',
      credentialType: 'Education',
      issuedAt: Math.floor(Date.now() / 1000),
      expiresAt: Math.floor((Date.now() + 365 * 24 * 60 * 60 * 1000) / 1000)
    })
    onScan(sampleCredential)
    setIsScanning(false)
  }

  return (
    <Card>
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">QR Code Scanner</h3>
        <p className="text-gray-600 text-sm">
          Scan a QR code to verify credentials or identity
        </p>
      </div>

      <div className="relative">
        <div
          className="w-full max-w-md mx-auto rounded-lg bg-gray-100 flex items-center justify-center"
          style={{ aspectRatio: '1/1' }}
        >
          {!isScanning ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera size={32} className="text-gray-600" />
              </div>
              <p className="text-gray-600 text-sm">Camera not active</p>
            </div>
          ) : (
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Scan size={32} className="text-blue-600" />
              </div>
              <p className="text-gray-600 text-sm mb-4">Scanning for QR codes...</p>
              
              <div className="space-y-3">
                <input
                  type="text"
                  value={mockInput}
                  onChange={(e) => setMockInput(e.target.value)}
                  placeholder="Paste QR data here for demo"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <div className="flex space-x-2">
                  <Button
                    onClick={simulateScan}
                    disabled={!mockInput.trim()}
                    variant="primary"
                    size="sm"
                    className="flex-1"
                  >
                    Simulate Scan
                  </Button>
                  <Button
                    onClick={scanSampleCredential}
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                  >
                    Scan Sample
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        {!isScanning ? (
          <Button onClick={startScanning} variant="primary">
            Start Scanning
          </Button>
        ) : (
          <Button onClick={stopScanning} variant="danger">
            Stop Scanning
          </Button>
        )}
      </div>
    </Card>
  )
}

export default QRScanner