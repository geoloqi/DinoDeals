//
//  EverydayCityViewController.h
//  EverydayCity
//
//  Copyright (c) 2012 Geoloqi, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CategoryCell.h"

@interface SettingsViewController : UIViewController <UITableViewDelegate, UITableViewDelegate> {
	IBOutlet UITableView *tableView;
	IBOutlet CategoryCell *categoryCell;
	NSArray *categories;
}

@property (strong) IBOutlet UISegmentedControl *currentTrackingProfile;
@property (strong) IBOutlet UILabel *currentLocationField;
@property (strong) IBOutlet UIActivityIndicatorView *currentLocationActivityIndicator;


- (IBAction)trackingProfileWasTapped:(UISegmentedControl *)sender;
- (IBAction)getLocationButtonWasTapped:(UIButton *)sender;
- (IBAction)fbLogoutWasTapped:(UIButton *)sender;
- (int)segmentIndexForTrackingProfile:(LQTrackerProfile)profile;

- (IBAction)categorySwitchWasTapped:(UISwitch *)sender;

- (NSMutableDictionary *)getCategoryAtIndexPath:(NSIndexPath *)indexPath;

@end
