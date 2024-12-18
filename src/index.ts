/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */

import WpEditor, { WpEditorProps, WpEditorRef } from './components/editor/WpEditor';
import FeedDetailEditor, {
  FeedDetailEditorProps,
  FeedDetailEditorValue,
  PostEditorImageValue,
  PostEditorMediaValue
} from './components/feed/FeedDetailEditor';

import FeedBox, { FeedBoxProps, FeedBoxRef } from './components/feed/FeedBox';
import FeedTextContent, { FeedTextContentProps } from './components/feed/FeedTextContent';
import FeedEmojiArea, { FeedEmojiAreaProps } from './components/feed/FeedEmojiArea';
import FeedEtcInfoArea, { FeedEtcInfoAreaProps } from './components/feed/FeedEtcInfoArea';
import FeedWriterInfo, { FeedWriterInfoProps } from './components/feed/FeedWriterInfo';
import CommentBox, { CommentBoxProps } from './components/comment/CommentBox';
import CommentEditor, { CommentEditorProps } from './components/comment/CommentEditor';
import CommentEtcInfo, { CommentEtcInfoProps } from './components/comment/CommentEtcInfo';
import CommentWriterInfo, { CommentWriterInfoProps } from './components/comment/CommentWriterInfo';
import { FeedIframesViewRef, IframePlayState } from './components/feed/FeedIframesView';
import {
  convertHtmlToMarkdownStr,
  convertMarkdownToHtmlStr,
  WP_HASH_REGEX,
  WP_MENTION_REGEX
} from './utils/valueParserUtils';
import CurationBox, { CurationBoxProps } from './components/feed/CurationBox';
import Accordion, { AccordionProps } from './components/accordion/Accordion';
import AccordionGroup, { AccordionGroupProps } from './components/accordion/AccordionGroup';
import AvatarGroup, { AvatarGroupProps } from './components/avatars/AvatarGroup';
import BulletList, { BulletListProps } from './components/bulletList/BulletList';
import AvatarButton, { AvatarButtonProps } from './components/buttons/AvatarButton';
import Chip, { ChipProps } from './components/buttons/Chip';
import RefreshButton, { RefreshButtonProps } from './components/buttons/RefreshButton';
import SolidSquareButton, { SolidSquareButtonProps } from './components/buttons/SolidSquareButton';
import Button, { ButtonProps } from './components/buttons/Button';
import SolidCapButton, { SolidCapButtonProps } from './components/buttons/SolidCapButton';
import Carousel, { CarouselProps } from './components/carousel/Carousel';
import Countdown, { CountdownProps } from './components/countdown/Countdown';
import Counter, { CounterProps } from './components/counter/Counter';
import Drawer, { DrawerProps } from './components/drawer/Drawer';
import Ellipsis, { EllipsisProps } from './components/ellipsis/Ellipsis';
import WpImage, { WpImageProps } from './components/image/WpImage';
import CheckBox, { CheckBoxProps } from './components/inputs/checkbox/CheckBox';
import Check, { CheckProps } from './components/inputs/checkbox/Check';
import RoundCheckBox from './components/inputs/checkbox/RoundCheckBox';
import MultiRangeInput, {
  MultiRangeInputProps
} from './components/inputs/multiRangeInput/MultiRangeInput';
import NumberInput, { NumberInputProps } from './components/inputs/numberInput/NumberInput';
import RadioBox, { RadioBoxProps } from './components/inputs/radiobox/RadioBox';
import RadioButton, { RadioButtonProps } from './components/inputs/radiobox/RadioButton';
import SelectBox, { SelectBoxProps, SelectBoxRef } from './components/inputs/select/SelectBox';
import Option, { OptionProps } from './components/inputs/select/Option';
import SelectDropBox, { SelectDropBoxProps } from './components/inputs/select/SelectDropBox';
import TextArea, { TextAreaProps } from './components/inputs/textarea/TextArea';
import TextInput, { TextInputProps } from './components/inputs/textInput/TextInput';
import Spinner, { SpinnerProps } from './components/loadings/Spinner';
import NoDataText, { NoDataTextProps } from './components/noData/NoDataText';
import NoDataAction, { NoDataActionProps } from './components/noData/NoDataAction';
import NoDataIconText, { NoDataIconTextProps } from './components/noData/NoDataIconText';
import NoImage, { NoImageProps } from './components/noData/NoImage';
import Popover, { PopoverProps } from './components/popover/Popover';
import PopoverButton, {
  PopoverButtonProps,
  PopoverButtonRef
} from './components/popover/PopoverButton';
import Ripple, { RippleOption, RippleProps } from './components/ripple/Ripple';
import Timer, { TimerProps } from './components/timer/Timer';

export type {
  WpEditorRef,
  WpEditorProps,
  FeedDetailEditorProps,
  PostEditorMediaValue,
  PostEditorImageValue,
  FeedDetailEditorValue,
  FeedBoxRef,
  FeedIframesViewRef,
  IframePlayState,
  FeedBoxProps,
  FeedTextContentProps,
  CurationBoxProps,
  FeedEmojiAreaProps,
  FeedEtcInfoAreaProps,
  FeedWriterInfoProps,
  CommentBoxProps,
  CommentEditorProps,
  CommentEtcInfoProps,
  CommentWriterInfoProps,
  AccordionProps,
  AccordionGroupProps,
  AvatarGroupProps,
  BulletListProps,
  ButtonProps,
  AvatarButtonProps,
  ChipProps,
  RefreshButtonProps,
  SolidSquareButtonProps,
  SolidCapButtonProps,
  CarouselProps,
  CountdownProps,
  CounterProps,
  DrawerProps,
  EllipsisProps,
  WpImageProps,
  CheckProps,
  CheckBoxProps,
  MultiRangeInputProps,
  NumberInputProps,
  RadioBoxProps,
  RadioButtonProps,
  SelectBoxProps,
  SelectBoxRef,
  OptionProps,
  SelectDropBoxProps,
  TextAreaProps,
  TextInputProps,
  SpinnerProps,
  NoDataActionProps,
  NoDataIconTextProps,
  NoDataTextProps,
  NoImageProps,
  PopoverProps,
  PopoverButtonProps,
  PopoverButtonRef,
  RippleProps,
  RippleOption,
  TimerProps
};
export {
  WpEditor,
  FeedDetailEditor,
  FeedBox,
  FeedTextContent,
  FeedEmojiArea,
  FeedEtcInfoArea,
  FeedWriterInfo,
  CommentBox,
  CurationBox,
  CommentEditor,
  CommentEtcInfo,
  CommentWriterInfo,
  convertMarkdownToHtmlStr,
  convertHtmlToMarkdownStr,
  Accordion,
  AccordionGroup,
  AvatarGroup,
  BulletList,
  Button,
  AvatarButton,
  Chip,
  RefreshButton,
  SolidSquareButton,
  SolidCapButton,
  Carousel,
  Countdown,
  Counter,
  Drawer,
  Ellipsis,
  WpImage,
  Check,
  CheckBox,
  RoundCheckBox,
  MultiRangeInput,
  NumberInput,
  RadioBox,
  RadioButton,
  SelectBox,
  Option,
  SelectDropBox,
  TextArea,
  TextInput,
  Spinner,
  NoDataText,
  NoDataAction,
  NoDataIconText,
  NoImage,
  Popover,
  PopoverButton,
  Ripple,
  Timer
};
