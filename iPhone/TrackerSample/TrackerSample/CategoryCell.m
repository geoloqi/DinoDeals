//
//  CategoryViewCell.m
//  DealsDemo
//
//  Created by Aaron Parecki on 2012-04-29.
//  Copyright (c) 2012 Geoloqi. All rights reserved.
//

#import "CategoryCell.h"

@implementation CategoryCell

- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        // Initialization code
    }
    return self;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated
{
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

- (void)setLabelText:(NSString *)_text {
    label.text = _text;
}

- (void)setSubscribedSwitch:(NSString *)_state {
    statusSwitch.on = [_state boolValue];
}


@end
