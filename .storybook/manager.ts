/// <reference path="./assets.d.ts" />

import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
import logo from '../logo.png';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'react-ai-chat-actions',
    brandImage: logo,
    brandTarget: '_self',
  }),
});
