#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "RCTSwiftBridgeModule.h"
#import "ICGRulerView.h"
#import "ICGThumbView.h"
#import "ICGVideoTrimmer.h"
#import "ICGVideoTrimmerView.h"
#import "RNTrimmerView-Bridging-Header.h"
#import "RNTrimmerView.h"
#import "RNVideoProcessing-Bridging-Header.h"
#import "RNVideoProcessing.h"
#import "RNVideoTrimmer-Bridging-Header.h"
#import "SDAVAssetExportSession.h"

FOUNDATION_EXPORT double RNVideoProcessingVersionNumber;
FOUNDATION_EXPORT const unsigned char RNVideoProcessingVersionString[];

