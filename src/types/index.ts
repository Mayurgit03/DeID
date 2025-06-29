export interface DID {
  id: string
  document: DIDDocument
  owner: string
  createdAt: string
  isActive: boolean
  profileData: ProfileData
}

export interface DIDDocument {
  "@context": string[]
  id: string
  controller: string
  verificationMethod: VerificationMethod[]
  authentication: string[]
  service: Service[]
}

export interface VerificationMethod {
  id: string
  type: string
  controller: string
  publicKeyHex: string
}

export interface Service {
  id: string
  type: string
  serviceEndpoint: any
}

export interface ProfileData {
  name: string
  email: string
  bio?: string
  profileImage?: string
  organization?: string
  location?: string
}

export interface Credential {
  id: string
  credentialHash: string
  issuer: string
  subject: string
  issuedAt: string
  expiresAt?: string
  isRevoked: boolean
  credentialType: string
  metadata: Record<string, any>
  proofType?: string
  signature?: string
}

export interface Guardian {
  address: string
  isActive: boolean
  name?: string
  addedAt: string
}

export interface VerificationResult {
  isValid: boolean
  credential?: Credential
  verifiedAt: string
  status: 'Valid' | 'Invalid' | 'Revoked' | 'Expired' | 'Error'
  error?: string
}

export interface WalletConnection {
  address: string
  chainId: number
  isConnected: boolean
  balance?: string
}