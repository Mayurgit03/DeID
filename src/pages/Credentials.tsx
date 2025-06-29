import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import QRCode from 'qrcode'

const Credentials: React.FC = () => {
  const { userDID, credentials, revokeCredential } = useStore()
  const [selectedCredential, setSelectedCredential] = useState<any>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')

  const generateQRCode = async (credential: any) => {
    try {
      const credentialData = {
        type: 'verifiable-credential',
        credentialHash: credential.credentialHash,
        issuer: credential.issuer,
        subject: credential.subject,
        credentialType: credential.credentialType,
        issuedAt: credential.issuedAt,
        expiresAt: credential.expiresAt
      }
      
      const qrUrl = await QRCode.toDataURL(JSON.stringify(credentialData))
      setQrCodeUrl(qrUrl)
      setSelectedCredential(credential)
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  const handleRevokeCredential = (credentialId: string) => {
    revokeCredential(credentialId)
  }

  const getCredentialTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'education':
        return '🎓'
      case 'employment':
        return '💼'
      case 'identity':
        return '🆔'
      case 'certification':
        return '📜'
      default:
        return '📋'
    }
  }

  const getCredentialStatus = (credential: any) => {
    if (credential.isRevoked) return { status: 'Revoked', color: 'red' }
    if (credential.expiresAt && new Date(credential.expiresAt) < new Date()) {
      return { status: 'Expired', color: 'orange' }
    }
    return { status: 'Active', color: 'green' }
  }

  if (!userDID) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📜</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No DID Found</h2>
          <p className="text-gray-600 mb-6">
            You need to create a DID first to manage credentials.
          </p>
          <a
            href="/create-did"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create DID
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Verifiable Credentials
            </h1>
            <p className="text-gray-600">
              Manage your verifiable credentials issued by trusted institutions
            </p>
            <div className="mt-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
              Demo Mode - Sample Credentials
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{credentials.length}</div>
            <div className="text-sm text-gray-600">Total Credentials</div>
          </div>
        </div>
      </div>

      {/* Credentials Grid */}
      {credentials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((credential, index) => {
            const status = getCredentialStatus(credential)
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">
                        {getCredentialTypeIcon(credential.credentialType)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {credential.credentialType}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Issued {new Date(credential.issuedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs bg-${status.color}-100 text-${status.color}-800`}>
                    {status.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div>
                    <span className="text-sm text-gray-600">Issuer:</span>
                    <p className="text-sm font-mono text-gray-900 truncate">
                      {credential.issuer}
                    </p>
                  </div>
                  {credential.expiresAt && (
                    <div>
                      <span className="text-sm text-gray-600">Expires:</span>
                      <p className="text-sm text-gray-900">
                        {new Date(credential.expiresAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {credential.metadata && (
                    <div>
                      <span className="text-sm text-gray-600">Details:</span>
                      <div className="text-sm text-gray-900">
                        {Object.entries(credential.metadata).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key}:</span>
                            <span>{value as string}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => generateQRCode(credential)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Generate QR
                  </button>
                  {!credential.isRevoked && (
                    <button
                      onClick={() => handleRevokeCredential(credential.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📜</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Credentials Yet</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You don't have any verifiable credentials yet. In a real application, 
            trusted institutions would issue credentials to your DID.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-blue-700">
              <strong>Your DID:</strong> {userDID.id}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Share this with credential issuers
            </p>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {selectedCredential && qrCodeUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Credential QR Code
              </h3>
              <div className="mb-4">
                <img src={qrCodeUrl} alt="QR Code" className="mx-auto" />
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Scan this QR code to verify the credential
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setSelectedCredential(null)
                    setQrCodeUrl('')
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a')
                    link.download = `credential-${selectedCredential.credentialType}-qr.png`
                    link.href = qrCodeUrl
                    link.click()
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Credentials