# Design Specifications - Exact Values from Adobe XD

This document contains the exact font, color, and CSS specifications extracted from the Adobe XD designs.

## Typography

### Font Family
- **Primary Font**: Museo Sans Rounded (Commercial font)
- **Fallback Font**: Nunito (Google Fonts - closest alternative)
- **Font Stack**: `'Nunito', 'Museo Sans Rounded', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`

**Note**: Museo Sans Rounded is a commercial font. For exact match, purchase and host locally. Nunito is used as a close alternative.

### Font Weights
- **Regular/Medium**: 500 (Museo Sans Rounded 500)
- **Black/Bold**: 900 (Museo Sans Rounded 900)

### Typography Specifications

#### Main Heading (Title)
- **Font**: Museo Sans Rounded 900, Regular
- **Size**: 28pt (37.33px)
- **Color**: #026786 (Dark Teal)
- **Line Height**: 56px
- **Letter Spacing**: -31.25 (converted to -0.31px for web)
- **Usage**: Page titles ("Subscription plan", "Device management")

#### Subtitle/Body Text
- **Font**: Museo Sans Rounded 500, Regular
- **Size**: 20pt (26.67px)
- **Color**: #4A4A4A (Dark Gray)
- **Line Height**: 22px
- **Usage**: Subtitles, descriptions, section titles

#### Body Text (Smaller)
- **Font**: Museo Sans Rounded 500, Regular
- **Size**: 18pt (24px)
- **Color**: #4A4A4A (Dark Gray)
- **Line Height**: 1.5 (36px)
- **Usage**: Form labels, input text, buttons, navigation links

## Color Palette

### Primary Colors
- **Primary Teal**: `#00BFA5` - Brand color, used for headers, accents
- **Dark Teal**: `#026786` - Used for headings and important text
- **Yellow Button**: `#FFC107` - Call-to-action buttons
- **Yellow Button Hover**: `#FFB300` - Button hover state

### Text Colors
- **Primary Text**: `#4A4A4A` - Main body text (was #333333)
- **Secondary Text**: `#666666` - Secondary text
- **Light Text**: `#999999` - Placeholder text, disabled states

### UI Colors
- **Background White**: `#FFFFFF`
- **Background Light**: `#F5F5F5`
- **Border Color**: `#E0E0E0`
- **Blue Accent**: `#2196F3` - Links, checkmarks
- **Green Check**: `#4CAF50` - Success states, completed steps

## Component-Specific Styles

### Subscription Page

#### Title
```scss
font-size: 37.33px; // 28pt
font-weight: 900;
color: #026786;
line-height: 56px;
letter-spacing: -0.31px;
```

#### Subtitle
```scss
font-size: 26.67px; // 20pt
font-weight: 500;
color: #4A4A4A;
line-height: 22px;
```

#### Section Title
```scss
font-size: 26.67px; // 20pt
font-weight: 500;
color: #4A4A4A;
line-height: 22px;
```

#### Plan Name
```scss
font-size: 26.67px; // 20pt
font-weight: 500;
color: #4A4A4A;
line-height: 22px;
```

#### Plan Price
```scss
font-size: 24px; // 18pt
font-weight: 700;
color: #026786;
```

#### Plan Features
```scss
font-size: 24px; // 18pt
font-weight: 500;
color: #4A4A4A;
line-height: 1.5;
```

#### Selected Plan Card
```scss
border-color: #00BFA5; // Teal border (not blue)
background-color: rgba(0, 191, 165, 0.05);
```

### Device Page

#### Title
```scss
font-size: 37.33px; // 28pt
font-weight: 900;
color: #026786;
line-height: 56px;
letter-spacing: -0.31px;
```

#### Subtitle
```scss
font-size: 26.67px; // 20pt
font-weight: 500;
color: #4A4A4A;
line-height: 22px;
```

#### Form Labels
```scss
font-size: 24px; // 18pt
font-weight: 500;
color: #4A4A4A;
```

#### Input Fields
```scss
font-size: 24px; // 18pt
font-family: 'Nunito', 'Museo Sans Rounded', sans-serif;
color: #4A4A4A;
```

### Header

#### Logo Text
```scss
font-size: 24px; // 18pt
font-weight: 500;
color: white; // On teal background
```

#### Navigation Links
```scss
font-size: 24px; // 18pt
font-weight: 500;
color: white; // On teal background
```

### Sidebar

#### Step Text
```scss
font-size: 24px; // 18pt
font-weight: 500;
color: #666666; // Default
color: #00BFA5; // Active
color: #2196F3; // Completed
```

### Button

#### Primary Button (Next)
```scss
font-size: 24px; // 18pt
font-weight: 500;
background-color: #FFC107;
color: #333333; // Dark text on yellow
```

## Spacing

### Standard Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

## Border Radius

- **sm**: 4px
- **md**: 8px
- **lg**: 12px
- **xl**: 16px

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Mobile Adjustments

### Title (Mobile)
- **Size**: 28px (reduced from 37.33px)
- **Line Height**: 42px (reduced from 56px)

### Other Elements
- Maintain same font sizes but adjust spacing for mobile
- Reduce padding and margins proportionally

## Implementation Notes

1. **Font Loading**: Nunito is loaded from Google Fonts as fallback
2. **Exact Sizes**: All font sizes are converted from pt to px (1pt ≈ 1.33px)
3. **Line Heights**: Exact values from specs are used where specified
4. **Letter Spacing**: Converted from design units to CSS pixels
5. **Color Accuracy**: All hex values match Adobe XD specs exactly

## Font Installation (For Exact Match)

To use the exact Museo Sans Rounded font:

1. Purchase license from [MyFonts](https://www.myfonts.com/fonts/exljbris/museo-sans-rounded/) or similar
2. Host font files in `/public/fonts/` directory
3. Add `@font-face` declarations in `global.scss`
4. Update `$font-family` variable to prioritize Museo Sans Rounded

Example:
```scss
@font-face {
  font-family: 'Museo Sans Rounded';
  src: url('/fonts/MuseoSansRounded-500.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Museo Sans Rounded';
  src: url('/fonts/MuseoSansRounded-900.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
}
```

---

**Last Updated**: December 2024  
**Source**: Adobe XD Design Specs  
**Design Files**: 
- Desktop: https://xd.adobe.com/view/a713682f-3952-44fd-9785-a1ab8267d313-f240/
- Mobile: https://xd.adobe.com/view/0e1ef7ed-0d67-4508-8565-bdc247bc3bad-5b4d/

