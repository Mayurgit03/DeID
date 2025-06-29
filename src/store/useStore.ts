import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DID, Credential, Guardian, VerificationResult, ProfileData } from '../types'
import { generateMockCredentials } from '../utils/mockData'

interface AppState {
  // User state
  isConnected: boolean
  userAddress: string | null
  userDID: DID | null
  
  // Credentials
  credentials: Credential[]
  
  // Guardians
  guardians: Guardian[]
  
  // UI state
  isLoading: boolean
  
  // Actions
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  createDID: (profileData: ProfileData) => Promise<void>
  addCredential: (credential: Omit<Credential, 'id'>) => void
  revokeCredential: (credentialId: string) => void
  addGuardian: (guardian: Omit<Guardian, 'addedAt'>) => void
  removeGuardian: (address: string) => void
  verifyCredential: (hash: string) => Promise<VerificationResult>
  setLoading: (loading: boolean) => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      isConnected: false,
      userAddress: null,
      userDID: null,
      credentials: [],
      guardians: [],
      isLoading: false,

      // Actions
      connectWallet: async () => {
        set({ isLoading: true })
        
        // Simulate wallet connection delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const mockAddress = '0x742d35Cc6634C0532925a3b8D4C9db96590c6C87'
        set({ 
          isConnected: true, 
          userAddress: mockAddress,
          isLoading: false
        })
      },

      disconnectWallet: () => {
        set({ 
          isConnected: false, 
          userAddress: null,
          userDID: null,
          credentials: [],
          guardians: []
        })
      },

      createDID: async (profileData: ProfileData) => {
        const userAddress = get().userAddress
        if (!userAddress) return

        set({ isLoading: true })

        // Simulate DID creation delay
        await new Promise(resolve => setTimeout(resolve, 2000))

        const did: DID = {
          id: `did:deid:${userAddress.toLowerCase()}`,
          document: {
            "@context": ["https://www.w3.org/ns/did/v1"],
            "id": `did:deid:${userAddress.toLowerCase()}`,
            "controller": userAddress,
            "verificationMethod": [{
              "id": `did:deid:${userAddress.toLowerCase()}#key-1`,
              "type": "EcdsaSecp256k1VerificationKey2019",
              "controller": `did:deid:${userAddress.toLowerCase()}`,
              "publicKeyHex": userAddress
            }],
            "authentication": [`did:deid:${userAddress.toLowerCase()}#key-1`],
            "service": [{
              "id": `did:deid:${userAddress.toLowerCase()}#profile`,
              "type": "Profile",
              "serviceEndpoint": profileData
            }]
          },
          owner: userAddress,
          createdAt: new Date().toISOString(),
          isActive: true,
          profileData
        }

        set({ userDID: did, isLoading: false })

        // Add mock credentials after DID creation
        setTimeout(() => {
          const mockCredentials = generateMockCredentials(userAddress)
          mockCredentials.forEach(cred => get().addCredential(cred))
        }, 1000)
      },

      addCredential: (credentialData) => {
        const credential: Credential = {
          id: Math.random().toString(36).substr(2, 9),
          ...credentialData
        }
        set(state => ({ 
          credentials: [...state.credentials, credential] 
        }))
      },

      revokeCredential: (credentialId) => {
        set(state => ({
          credentials: state.credentials.map(cred => 
            cred.id === credentialId 
              ? { ...cred, isRevoked: true }
              : cred
          )
        }))
      },

      addGuardian: (guardianData) => {
        const guardian: Guardian = {
          ...guardianData,
          addedAt: new Date().toISOString()
        }
        set(state => ({
          guardians: [...state.guardians, guardian]
        }))
      },

      removeGuardian: (address) => {
        set(state => ({
          guardians: state.guardians.filter(g => g.address !== address)
        }))
      },

      verifyCredential: async (hash) => {
        // Simulate verification delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const credentials = get().credentials
        const credential = credentials.find(c => c.credentialHash === hash)
        
        if (credential) {
          if (credential.isRevoked) {
            return {
              isValid: false,
              credential,
              verifiedAt: new Date().toISOString(),
              status: 'Revoked' as const
            }
          }
          
          if (credential.expiresAt && new Date(credential.expiresAt) < new Date()) {
            return {
              isValid: false,
              credential,
              verifiedAt: new Date().toISOString(),
              status: 'Expired' as const
            }
          }
          
          return {
            isValid: true,
            credential,
            verifiedAt: new Date().toISOString(),
            status: 'Valid' as const
          }
        }
        
        return {
          isValid: false,
          verifiedAt: new Date().toISOString(),
          status: 'Invalid' as const,
          error: 'Credential not found'
        }
      },

      setLoading: (loading) => {
        set({ isLoading: loading })
      }
    }),
    {
      name: 'deid-storage',
      partialize: (state) => ({
        userDID: state.userDID,
        credentials: state.credentials,
        guardians: state.guardians,
        isConnected: state.isConnected,
        userAddress: state.userAddress
      })
    }
  )
)