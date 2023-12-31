#import "SentryCrashSysCtl.h"
#import "SentrySysctl.h"
#import <Foundation/Foundation.h>
#import <SentryAppState.h>
#import <SentryAppStateManager.h>
#import <SentryCrashWrapper.h>
#import <SentryCurrentDateProvider.h>
#import <SentryFileManager.h>
#import <SentryOptions.h>

#if SENTRY_HAS_UIKIT
#    import <UIKit/UIKit.h>
#endif

@interface
SentryAppStateManager ()

@property (nonatomic, strong) SentryOptions *options;
@property (nonatomic, strong) SentryCrashWrapper *crashWrapper;
@property (nonatomic, strong) SentryFileManager *fileManager;
@property (nonatomic, strong) id<SentryCurrentDateProvider> currentDate;
@property (nonatomic, strong) SentrySysctl *sysctl;

@end

@implementation SentryAppStateManager

- (instancetype)initWithOptions:(SentryOptions *)options
                   crashWrapper:(SentryCrashWrapper *)crashWrapper
                    fileManager:(SentryFileManager *)fileManager
            currentDateProvider:(id<SentryCurrentDateProvider>)currentDateProvider
                         sysctl:(SentrySysctl *)sysctl
{
    if (self = [super init]) {
        self.options = options;
        self.crashWrapper = crashWrapper;
        self.fileManager = fileManager;
        self.currentDate = currentDateProvider;
        self.sysctl = sysctl;
    }
    return self;
}

#if SENTRY_HAS_UIKIT

- (SentryAppState *)buildCurrentAppState
{
    // Is the current process being traced or not? If it is a debugger is attached.
    bool isDebugging = self.crashWrapper.isBeingTraced;

    NSString *vendorId = [UIDevice.currentDevice.identifierForVendor UUIDString];

    return [[SentryAppState alloc] initWithReleaseName:self.options.releaseName
                                             osVersion:UIDevice.currentDevice.systemVersion
                                              vendorId:vendorId
                                           isDebugging:isDebugging
                                   systemBootTimestamp:self.sysctl.systemBootTimestamp];
}

- (SentryAppState *)loadPreviousAppState
{
    return [self.fileManager readPreviousAppState];
}

- (SentryAppState *)loadCurrentAppState
{
    return [self.fileManager readAppState];
}

- (void)storeCurrentAppState
{
    [self.fileManager storeAppState:[self buildCurrentAppState]];
}

- (void)deleteAppState
{
    [self.fileManager deleteAppState];
}

- (void)updateAppState:(void (^)(SentryAppState *))block
{
    @synchronized(self) {
        SentryAppState *appState = [self.fileManager readAppState];
        if (nil != appState) {
            block(appState);
            [self.fileManager storeAppState:appState];
        }
    }
}

#endif

@end
