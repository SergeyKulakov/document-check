//
//  VerificationPageCollectedData.swift
//  StripeIdentity
//
//  Created by Mel Ludowise on 2/26/22.
//

import Foundation
@_spi(STP) import StripeCore

extension StripeAPI {
    struct VerificationPageCollectedData: Encodable, Equatable {

        let biometricConsent: Bool?
        let face: VerificationPageDataFace?
        let idDocumentBack: VerificationPageDataDocumentFileData?
        let idDocumentFront: VerificationPageDataDocumentFileData?
        let idDocumentType: DocumentType?

        init(
            biometricConsent: Bool? = nil,
            face: VerificationPageDataFace? = nil,
            idDocumentBack: VerificationPageDataDocumentFileData? = nil,
            idDocumentFront: VerificationPageDataDocumentFileData? = nil,
            idDocumentType: DocumentType? = nil
        ) {
            self.biometricConsent = biometricConsent
            self.face = face
            self.idDocumentBack = idDocumentBack
            self.idDocumentFront = idDocumentFront
            self.idDocumentType = idDocumentType
        }
    }
}

/**
 All mutating functions needs to pass all values explicitly to the new object, as the default value would be nil.
 */
extension StripeAPI.VerificationPageCollectedData {
    /**
     Returns a new `VerificationPageCollectedData`, merging the data from this
     one with the provided one.
     */
    func merging(_ otherData: StripeAPI.VerificationPageCollectedData) -> StripeAPI.VerificationPageCollectedData {
        return StripeAPI.VerificationPageCollectedData(
            biometricConsent: otherData.biometricConsent ?? self.biometricConsent,
            face: otherData.face ?? self.face,
            idDocumentBack: otherData.idDocumentBack ?? self.idDocumentBack,
            idDocumentFront: otherData.idDocumentFront ?? self.idDocumentFront,
            idDocumentType: otherData.idDocumentType ?? self.idDocumentType
        )
    }

    /**
     Merges the data from the provided `VerificationPageCollectedData` into this one.
     */
    mutating func merge(_ otherData: StripeAPI.VerificationPageCollectedData) {
        self = self.merging(otherData)
    }
    
    /**
     Clear .idDocumentFront.
     */
    mutating func clearFront() {
        self = StripeAPI.VerificationPageCollectedData(
                   biometricConsent: self.biometricConsent,
                   face: self.face,
                   idDocumentBack: self.idDocumentBack,
                   idDocumentFront: nil,
                   idDocumentType: self.idDocumentType
               )
    }
    
    /**
     Clear .idDocumentBack.
     */
    mutating func clearBack() {
        self  = StripeAPI.VerificationPageCollectedData(
                    biometricConsent: self.biometricConsent,
                    face: self.face,
                    idDocumentBack: nil,
                    idDocumentFront: self.idDocumentFront,
                    idDocumentType: self.idDocumentType
                )
    }

    /// Helper to determine the front document score for analytics purposes
    var frontDocumentScore: TwoDecimalFloat? {
        switch idDocumentType {
        case .drivingLicense,
             .idCard:
            return idDocumentFront?.frontCardScore
        case .passport:
            return idDocumentFront?.passportScore
        case .none:
            return nil
        }
    }
}
