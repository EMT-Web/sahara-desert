import { type SchemaTypeDefinition } from 'sanity'

// Import our custom schemas
import {homepageType} from './homepageType'
import {tourType} from './tourType'
import {experienceType} from './experienceType'
import {destinationType} from './destinationType'
import {storyType} from './storyType'
import {authorType} from './authorType'
import {galleryItemType} from './galleryItemType'
import {musicEntryType} from './musicEntryType'
import {guideType} from './guideType'
import {cultureType} from './cultureType'
import {sustainabilityType} from './sustainabilityType'
import {aboutType} from './aboutType'
import {contactType} from './contactType'
import {siteSettingsType} from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Core content
    homepageType,
    siteSettingsType,
    contactType,
    aboutType,
    // Tours & Experiences
    tourType,
    experienceType,
    destinationType,
    // Content
    storyType,
    authorType,
    galleryItemType,
    musicEntryType,
    guideType,
    // Pages
    cultureType,
    sustainabilityType,
  ],
}
