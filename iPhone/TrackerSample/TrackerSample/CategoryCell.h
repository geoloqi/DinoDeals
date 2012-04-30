//
//  CategoryViewCell.h
//  DealsDemo
//
//  Created by Aaron Parecki on 2012-04-29.
//  Copyright (c) 2012 Geoloqi. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface CategoryCell : UITableViewCell {
    IBOutlet UILabel *label;
    IBOutlet UISwitch *statusSwitch;
}

- (void)setLabelText:(NSString *)_text;
- (void)setSubscribedSwitch:(NSString *)_state;
- (void)setSwitchTag:(int)tag;

@end
