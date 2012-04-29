//
//  EverydayCityViewController.h
//  EverydayCity
//
//  Copyright (c) 2012 Geoloqi, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface SettingsViewController : UIViewController {
    
}

@property (strong) IBOutlet UISegmentedControl *currentTrackingProfile;
@property (strong) IBOutlet UILabel *currentLocationField;
@property (strong) IBOutlet UIActivityIndicatorView *currentLocationActivityIndicator;


- (IBAction)trackingProfileWasTapped:(UISegmentedControl *)sender;
- (IBAction)getLocationButtonWasTapped:(UIButton *)sender;
- (IBAction)fbLogoutWasTapped:(UIButton *)sender;
- (int)segmentIndexForTrackingProfile:(LQTrackerProfile)profile;

@end
