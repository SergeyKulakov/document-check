//
// VerificationPageStaticContentDocumentCaptureModels.swift
//
// Generated by swagger-codegen
// https://github.com/swagger-api/swagger-codegen
//

import Foundation
@_spi(STP) import StripeCore

extension StripeAPI { 
    
    struct VerificationPageStaticContentDocumentCaptureModels: Decodable, Equatable {
        let idDetectorMinIou: Decimal
        let idDetectorMinScore: Decimal
        let idDetectorUrl: String
    }
    
}
