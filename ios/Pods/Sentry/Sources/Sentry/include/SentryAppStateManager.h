#import "SentryCurrentDateProvider.h"
#import "SentryDefines.h"

@class SentryOptions, SentryCrashWrapper, SentryAppState, SentryFileManager, SentrySysctl;

NS_ASSUME_NONNULL_BEGIN

@interface SentryAppStateManager : NSObject
SENTRY_NO_INIT

- (instancetype)initWithOptions:(SentryOptions *)options
                   crashWrapper:(SentryCrashWrapper *)crashWrapper
                    fileManager:(SentryFileManager *)fileManager
            currentDateProvider:(id<SentryCurrentDateProvider>)currentDateProvider
                         sysctl:(SentrySysctl *)sysctl;

#if SENTRY_HAS_UIKIT

/**
 * Builds the current app state.
 *
 * @discussion The systemBootTimestamp is calculated by taking the current time and substracting
 * NSProcesInfo.systemUptime.  NSProcesInfo.systemUptime returns the amount of time the system has
 * been awake since the last time it was restarted. This means This is a good enough approximation
 * about the timestamp the system booted.
 */
- (SentryAppState *)buildCurrentAppState;

- (SentryAppState *)loadPreviousAppState;

- (SentryAppState *)loadCurrentAppState;

- (void)storeCurrentAppState;

- (void)deleteAppState;

- (void)updateAppState:(void (^)(SentryAppState *))block;

#endif

@end

NS_ASSUME_NONNULL_END
