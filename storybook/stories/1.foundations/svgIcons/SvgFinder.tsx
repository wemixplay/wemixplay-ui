import React, { createElement, useMemo, useState } from 'react';
import TextInput from '@/components/inputs/textInput/TextInput';
import ListMap from '@/components/list/ListMap';
import * as SvgIcons from '@/assets/svgs';
import { copyClipboard } from '@/utils/browserUtils';
import { makeCxFunc } from '@/utils/forReactUtils';

import style from './SvgFinder.module.scss';

interface PropsType {}

const cx = makeCxFunc(style);

const SvgFinder = ({}: PropsType) => {
  const [name, setName] = useState('');

  const gnbList = [
    { name: 'SvgIconHomeOutline', component: SvgIcons.SvgIconHomeOutline },
    { name: 'SvgIconHomeFill', component: SvgIcons.SvgIconHomeFill },
    { name: 'SvgIconGamesOutline', component: SvgIcons.SvgIconGamesOutline },
    { name: 'SvgIconGamesFill', component: SvgIcons.SvgIconGamesFill },
    { name: 'SvgIconNftOutline', component: SvgIcons.SvgIconNftOutline },
    { name: 'SvgIconNftFill', component: SvgIcons.SvgIconNftFill },
    { name: 'SvgIconWebshopOutline', component: SvgIcons.SvgIconWebshopOutline },
    { name: 'SvgIconWebshopFill', component: SvgIcons.SvgIconWebshopFill },
    { name: 'SvgIconTokensOutline', component: SvgIcons.SvgIconTokensOutline },
    { name: 'SvgIconTokensFill', component: SvgIcons.SvgIconTokensFill },
    { name: 'SvgIconFeedOutline', component: SvgIcons.SvgIconFeedOutline },
    { name: 'SvgIconFeedFill', component: SvgIcons.SvgIconFeedFill },
    { name: 'SvgIconCommunityOutline', component: SvgIcons.SvgIconCommunityOutline },
    { name: 'SvgIconCommunityFill', component: SvgIcons.SvgIconCommunityFill }
  ];

  const menuList = [
    { name: 'SvgIconWalletOutline', component: SvgIcons.SvgIconWalletOutline },
    { name: 'SvgIconWalletFill', component: SvgIcons.SvgIconWalletFill },
    { name: 'SvgIconNotification', component: SvgIcons.SvgIconNotification },
    { name: 'SvgIconInbox', component: SvgIcons.SvgIconInbox },
    { name: 'SvgIconPost', component: SvgIcons.SvgIconPost },
    { name: 'SvgIconMyrewards', component: SvgIcons.SvgIconMyrewards }
  ];
  const commonList = [
    { name: 'SvgIconMorevertical', component: SvgIcons.SvgIconMorevertical },
    { name: 'SvgIconMorehorizontal', component: SvgIcons.SvgIconMorehorizontal },
    { name: 'SvgIconSearch', component: SvgIcons.SvgIconSearch },
    { name: 'SvgIconClose', component: SvgIcons.SvgIconClose },
    { name: 'SvgIconMenu', component: SvgIcons.SvgIconMenu },
    { name: 'SvgIconSetting', component: SvgIcons.SvgIconSetting },
    { name: 'SvgIconExternal', component: SvgIcons.SvgIconExternal },
    { name: 'SvgIconRefresh', component: SvgIcons.SvgIconRefresh },
    { name: 'SvgIconEmail', component: SvgIcons.SvgIconEmail },
    { name: 'SvgIconDelete', component: SvgIcons.SvgIconDelete },
    { name: 'SvgIconCopy', component: SvgIcons.SvgIconCopy },
    { name: 'SvgIconLink', component: SvgIcons.SvgIconLink },
    { name: 'SvgIconHeartOutline', component: SvgIcons.SvgIconHeartOutline },
    { name: 'SvgIconHeartFill', component: SvgIcons.SvgIconHeartFill },
    { name: 'SvgIconGlobe', component: SvgIcons.SvgIconGlobe },
    { name: 'SvgIconTheme', component: SvgIcons.SvgIconTheme },
    { name: 'SvgIconInfocircle', component: SvgIcons.SvgIconInfocircle },
    { name: 'SvgIconQuestioncircle', component: SvgIcons.SvgIconQuestioncircle },
    { name: 'SvgIconWarningcircle', component: SvgIcons.SvgIconWarningcircle },
    { name: 'SvgIconAlertTriangle', component: SvgIcons.SvgIconAlertTriangle },
    { name: 'SvgIconPerson', component: SvgIcons.SvgIconPerson },
    { name: 'SvgIconFriends', component: SvgIcons.SvgIconFriends },
    { name: 'SvgIconGroup', component: SvgIcons.SvgIconGroup },
    { name: 'SvgIconAddLarge', component: SvgIcons.SvgIconAddLarge },
    { name: 'SvgIconAddSmall', component: SvgIcons.SvgIconAddSmall },
    { name: 'SvgIconRemoveLarge', component: SvgIcons.SvgIconRemoveLarge },
    { name: 'SvgIconRemoveSmall', component: SvgIcons.SvgIconRemoveSmall },
    { name: 'SvgIconPlay', component: SvgIcons.SvgIconPlay },
    { name: 'SvgIconPause', component: SvgIcons.SvgIconPause },
    { name: 'SvgIconScan', component: SvgIcons.SvgIconScan },
    { name: 'SvgIconVideo', component: SvgIcons.SvgIconVideo },
    { name: 'SvgIconDownload', component: SvgIcons.SvgIconDownload },
    { name: 'SvgIconUpload', component: SvgIcons.SvgIconUpload },
    { name: 'SvgIconTobottom', component: SvgIcons.SvgIconTobottom },
    { name: 'SvgIconTotop', component: SvgIcons.SvgIconTotop },
    { name: 'SvgIconOut', component: SvgIcons.SvgIconOut },
    { name: 'SvgIconCheck', component: SvgIcons.SvgIconCheck },
    { name: 'SvgIconEyeOn', component: SvgIcons.SvgIconEyeOn },
    { name: 'SvgIconEyeOff', component: SvgIcons.SvgIconEyeOff },
    { name: 'SvgIconClock', component: SvgIcons.SvgIconClock },
    { name: 'SvgIconUpcoming', component: SvgIcons.SvgIconUpcoming },
    { name: 'SvgIconAlramclock', component: SvgIcons.SvgIconAlramclock },
    { name: 'SvgIconHourglass', component: SvgIcons.SvgIconHourglass },
    { name: 'SvgIconCancelMono', component: SvgIcons.SvgIconCancelMono },
    { name: 'SvgIconCancelColor', component: SvgIcons.SvgIconCancelColor },
    { name: 'SvgIconConnector', component: SvgIcons.SvgIconConnector },
    { name: 'SvgIconDarkMode', component: SvgIcons.SvgIconDarkMode },
    { name: 'SvgIconLightMode', component: SvgIcons.SvgIconLightMode }
  ];
  const arrowList = [
    { name: 'SvgIconChevronLeft', component: SvgIcons.SvgIconChevronLeft },
    {
      name: 'SvgIconChevronLeftNarrow',
      component: SvgIcons.SvgIconChevronLeftNarrow,
      width: 12,
      height: 24
    },
    { name: 'SvgIconChevronRight', component: SvgIcons.SvgIconChevronRight },
    {
      name: 'SvgIconChevronRightNarrow',
      component: SvgIcons.SvgIconChevronRightNarrow,
      width: 12,
      height: 24
    },
    { name: 'SvgIconChevronUp', component: SvgIcons.SvgIconChevronUp },
    { name: 'SvgIconChevronDown', component: SvgIcons.SvgIconChevronDown },
    { name: 'SvgIconArrowLeft', component: SvgIcons.SvgIconArrowLeft },
    { name: 'SvgIconArrowRight', component: SvgIcons.SvgIconArrowRight },
    { name: 'SvgIconArrowUp', component: SvgIcons.SvgIconArrowUp },
    { name: 'SvgIconArrowDown', component: SvgIcons.SvgIconArrowDown },
    { name: 'SvgIconArrowDownup', component: SvgIcons.SvgIconArrowDownup },
    { name: 'SvgIconArrowRightleft', component: SvgIcons.SvgIconArrowRightleft }
  ];
  const financeList = [
    { name: 'SvgIconGraph', component: SvgIcons.SvgIconGraph },
    { name: 'SvgIconBuy', component: SvgIcons.SvgIconBuy },
    { name: 'SvgIconSell', component: SvgIcons.SvgIconSell },
    { name: 'SvgIconSwap', component: SvgIcons.SvgIconSwap },
    { name: 'SvgIconExchange', component: SvgIcons.SvgIconExchange },
    { name: 'SvgIconPool', component: SvgIcons.SvgIconPool },
    { name: 'SvgIconDex', component: SvgIcons.SvgIconDex },
    { name: 'SvgIconStaking', component: SvgIcons.SvgIconStaking },
    { name: 'SvgIconBidwon', component: SvgIcons.SvgIconBidwon },
    { name: 'SvgIconCurrency', component: SvgIcons.SvgIconCurrency },
    { name: 'SvgIconNftSale', component: SvgIcons.SvgIconNftSale },
    { name: 'SvgIconNftOffer', component: SvgIcons.SvgIconNftOffer },
    { name: 'SvgIconNftTransfer', component: SvgIcons.SvgIconNftTransfer },
    { name: 'SvgIconNftBridge', component: SvgIcons.SvgIconNftBridge }
  ];
  const feedList = [
    { name: 'SvgIconComment', component: SvgIcons.SvgIconComment },
    { name: 'SvgIconThumbupOutline', component: SvgIcons.SvgIconThumbupOutline },
    { name: 'SvgIconThumbupFill', component: SvgIcons.SvgIconThumbupFill },
    { name: 'SvgIconShare', component: SvgIcons.SvgIconShare },
    { name: 'SvgIconImage', component: SvgIcons.SvgIconImage },
    { name: 'SvgIconEmoji', component: SvgIcons.SvgIconEmoji },
    { name: 'SvgIconPin', component: SvgIcons.SvgIconPin }
  ];
  const biList = [
    { name: 'SvgIconWemixplayMono', component: SvgIcons.SvgIconWemixplayMono },
    { name: 'SvgIconYoutubeMono', component: SvgIcons.SvgIconYoutubeMono },
    { name: 'SvgIconTwitchMono', component: SvgIcons.SvgIconTwitchMono },
    { name: 'SvgIconXMono', component: SvgIcons.SvgIconXMono },
    { name: 'SvgIconFacebookMono', component: SvgIcons.SvgIconFacebookMono },
    { name: 'SvgIconInstagramMono', component: SvgIcons.SvgIconInstagramMono },
    { name: 'SvgIconTelegramMono', component: SvgIcons.SvgIconTelegramMono },
    { name: 'SvgIconDiscordMono', component: SvgIcons.SvgIconDiscordMono },
    { name: 'SvgIconMediumMono', component: SvgIcons.SvgIconMediumMono },
    { name: 'SvgIconAppleMono', component: SvgIcons.SvgIconAppleMono },
    { name: 'SvgIconGoogleMono', component: SvgIcons.SvgIconGoogleMono }
  ];

  const biColorList = [
    { name: 'SvgIconWemixplayColor', component: SvgIcons.SvgIconWemixplayColor },
    { name: 'SvgIconYoutubeColor', component: SvgIcons.SvgIconYoutubeColor },
    { name: 'SvgIconTwitchColor', component: SvgIcons.SvgIconTwitchColor },
    { name: 'SvgIconXColor', component: SvgIcons.SvgIconXColor },
    { name: 'SvgIconFacebookColor', component: SvgIcons.SvgIconFacebookColor },
    { name: 'SvgIconInstagramColor', component: SvgIcons.SvgIconInstagramColor },
    { name: 'SvgIconTelegramColor', component: SvgIcons.SvgIconTelegramColor },
    { name: 'SvgIconDiscordColor', component: SvgIcons.SvgIconDiscordColor },
    { name: 'SvgIconMediumColor', component: SvgIcons.SvgIconMediumColor },
    { name: 'SvgIconAppleColor', component: SvgIcons.SvgIconAppleColor },
    { name: 'SvgIconGoogleColor', component: SvgIcons.SvgIconGoogleColor }
  ];
  const platformList = [
    { name: 'SvgIconGoogleplay', component: SvgIcons.SvgIconGoogleplay },
    { name: 'SvgIconAppstore', component: SvgIcons.SvgIconAppstore },
    { name: 'SvgIconGalaxystore', component: SvgIcons.SvgIconGalaxystore },
    { name: 'SvgIconWindows', component: SvgIcons.SvgIconWindows },
    { name: 'SvgIconSteam', component: SvgIcons.SvgIconSteam },
    { name: 'SvgIconMacos', component: SvgIcons.SvgIconMacos },
    { name: 'SvgIconApk', component: SvgIcons.SvgIconApk }
  ];
  const badgeList = [
    {
      name: 'SvgIconNewLarge',
      component: SvgIcons.SvgIconNewLarge,
      largeWidth: 35,
      largeHeight: 18
    },
    { name: 'SvgIconNewSmall', component: SvgIcons.SvgIconNewSmall },
    {
      name: 'SvgIconBetaLarge',
      component: SvgIcons.SvgIconBetaLarge,
      largeWidth: 35,
      largeHeight: 18
    },
    { name: 'SvgIconBetaSmall', component: SvgIcons.SvgIconBetaSmall },
    {
      name: 'SvgIconSoonLarge',
      component: SvgIcons.SvgIconSoonLarge,
      largeWidth: 35,
      largeHeight: 18
    },
    { name: 'SvgIconSoonSmall', component: SvgIcons.SvgIconSoonSmall },
    {
      name: 'SvgIconEventLarge',
      component: SvgIcons.SvgIconEventLarge,
      largeWidth: 35,
      largeHeight: 18
    },
    { name: 'SvgIconEventSmall', component: SvgIcons.SvgIconEventSmall },
    {
      name: 'SvgIconOpenLarge',
      component: SvgIcons.SvgIconOpenLarge,
      largeWidth: 35,
      largeHeight: 18
    },
    { name: 'SvgIconOpenSmall', component: SvgIcons.SvgIconOpenSmall },
    {
      name: 'SvgIconCertified',
      component: SvgIcons.SvgIconCertified,
      largeWidth: 24,
      largeHeight: 24
    },
    {
      name: 'SvgIconNewShort',
      component: SvgIcons.SvgIconNewShort,
      largeWidth: 24,
      largeHeight: 24
    },
    { name: 'SvgIconCrown', component: SvgIcons.SvgIconCrown, largeWidth: 24, largeHeight: 24 },
    {
      name: 'SvgIconMaintenance',
      component: SvgIcons.SvgIconMaintenance,
      largeWidth: 24,
      largeHeight: 24
    }
  ];

  const list = useMemo(() => {
    return Object.entries(SvgIcons).filter(([key]) =>
      key.toLowerCase().includes(name.toLowerCase())
    );
  }, [name]);

  return (
    <article className={cx('svg-finder')}>
      <div className={cx('find-input')}>
        <TextInput
          className={cx('text-input')}
          type="search"
          placeholder="찾고자 하는 SVG 컴포넌트명을 입력하세요"
          value={name}
          handleChange={setName}
        />
      </div>

      <p className={cx('desc')}>웹용 (모바일 버전과 2025.03.28 분기 됨)</p>
      <h3 className={cx('title')}>
        GNB - 주요 서비스들로 이동하는 기능을 대표합니다. Active 상태를 표현하기 위하여 Fill과
        Outline 두 타입을 가집니다.
      </h3>
      <ul className={cx('icon-list')}>
        <ListMap list={gnbList}>
          {({ item }) => (
            <li
              key={item.name}
              className={cx('icon-list-item')}
              onClick={() => {
                copyClipboard({ text: `<${item.name} />` });
                alert(`<${item.name} />`);
              }}
            >
              {createElement(item.component, { width: 24, height: 24 }, <></>)}
            </li>
          )}
        </ListMap>
      </ul>
      <h3 className={cx('title')}>
        Menu - GNB 이외에 연결되는 페이지 혹은 모달을 대표하는 아이콘들입니다.
      </h3>
      <ul className={cx('icon-list')}>
        <ListMap list={menuList}>
          {({ item }) => (
            <li
              key={item.name}
              className={cx('icon-list-item')}
              onClick={() => {
                copyClipboard({ text: `<${item.name} />` });
                alert(`<${item.name} />`);
              }}
            >
              {createElement(item.component, { width: 24, height: 24 }, <></>)}
            </li>
          )}
        </ListMap>
      </ul>
      <h3 className={cx('title')}>
        Common - 서비스 여러곳에 두루 사용되는 기본적인 아이콘들입니다.
      </h3>
      <ul className={cx('icon-list')}>
        <ListMap list={commonList}>
          {({ item }) => (
            <li
              key={item.name}
              className={cx('icon-list-item')}
              onClick={() => {
                copyClipboard({ text: `<${item.name} />` });
                alert(`<${item.name} />`);
              }}
            >
              {createElement(item.component, { width: 24, height: 24 }, <></>)}
            </li>
          )}
        </ListMap>
      </ul>
      <h3 className={cx('title')}>Arrow - 방향성을 상징하는 Arrow와 Chevron 아이콘들입니다.</h3>
      <ul className={cx('icon-list')}>
        <ListMap list={arrowList}>
          {({ item }) => (
            <li
              key={item.name}
              className={cx('icon-list-item')}
              onClick={() => {
                copyClipboard({ text: `<${item.name} />` });
                alert(`<${item.name} />`);
              }}
            >
              {createElement(
                item.component,
                { width: item.width || 24, height: item.height || 24 },
                <></>
              )}
            </li>
          )}
        </ListMap>
      </ul>
      <h3 className={cx('title')}>
        Finance - 토큰 및 NFT, 게임 아이템 관련 다양한 기능들을 상징하는 아이콘들입니다.
      </h3>
      <ul className={cx('icon-list')}>
        <ListMap list={financeList}>
          {({ item }) => (
            <li
              key={item.name}
              className={cx('icon-list-item')}
              onClick={() => {
                copyClipboard({ text: `<${item.name} />` });
                alert(`<${item.name} />`);
              }}
            >
              {createElement(item.component, { width: 24, height: 24 }, <></>)}
            </li>
          )}
        </ListMap>
      </ul>
      <h3 className={cx('title')}>Feed - Feed List 및 Detail에 사용되는 아이콘들입니다.</h3>
      <ul className={cx('icon-list')}>
        <ListMap list={feedList}>
          {({ item }) => (
            <li
              key={item.name}
              className={cx('icon-list-item')}
              onClick={() => {
                copyClipboard({ text: `<${item.name} />` });
                alert(`<${item.name} />`);
              }}
            >
              {createElement(item.component, { width: 24, height: 24 }, <></>)}
            </li>
          )}
        </ListMap>
      </ul>
      <h3 className={cx('title')}>
        BI - 아이콘 형식으로 사용되는 각종 서비스들의 BI 입니다. 흑백과 컬러 두 가지 버전으로
        관리합니다.
      </h3>
      <ul className={cx('icon-list')}>
        <ListMap list={biList}>
          {({ item }) => (
            <li
              key={item.name}
              className={cx('icon-list-item')}
              onClick={() => {
                copyClipboard({ text: `<${item.name} />` });
                alert(`<${item.name} />`);
              }}
            >
              {createElement(item.component, { width: 24, height: 24 }, <></>)}
            </li>
          )}
        </ListMap>
      </ul>
      <ul className={cx('icon-list')}>
        <ListMap list={biColorList}>
          {({ item }) => (
            <li
              key={item.name}
              className={cx('icon-list-item')}
              onClick={() => {
                copyClipboard({ text: `<${item.name} />` });
                alert(`<${item.name} />`);
              }}
            >
              {createElement(item.component, { width: 24, height: 24 }, <></>)}
            </li>
          )}
        </ListMap>
      </ul>
      <h3 className={cx('title')}>
        Platform - Games의 Play Now 및 About에 연결되는 스토어 플랫폼을 위해 사용됩니다.
      </h3>
      <ul className={cx('icon-list')}>
        <ListMap list={platformList}>
          {({ item }) => (
            <li
              key={item.name}
              className={cx('icon-list-item')}
              onClick={() => {
                copyClipboard({ text: `<${item.name} />` });
                alert(`<${item.name} />`);
              }}
            >
              {createElement(item.component, { width: 24, height: 24 }, <></>)}
            </li>
          )}
        </ListMap>
      </ul>

      <h3 className={cx('title')}>
        Badge - 서비스 내 특정 상태를 표현하기 위해 사용되는 아이콘들입니다.
      </h3>

      <ul className={cx('icon-list')}>
        <ListMap list={badgeList}>
          {({ item }) => (
            <li
              key={item.name}
              className={cx('icon-list-item')}
              onClick={() => {
                copyClipboard({ text: `<${item.name} />` });
                alert(`<${item.name} />`);
              }}
            >
              {createElement(
                item.component,
                { width: item.largeWidth || 28, height: item.largeHeight || 14 },
                <></>
              )}
            </li>
          )}
        </ListMap>
      </ul>

      <ul className={cx('svg-list')}>
        <ListMap
          list={list}
          noDataMsg={<div className={cx('no-data')}>찾으시는 SVG 컴포넌트가 없습니다.</div>}
        >
          {({ item: [name, component] }) => (
            <li key={name} className={cx('svg-item')}>
              <div
                className={cx('svg-componen-box')}
                onClick={() => {
                  copyClipboard({ text: `<${name} />` });
                  alert(`<${name} />`);
                }}
              >
                <span className={cx('icon-box')}>
                  {createElement(component, { width: 18, height: 18 }, <></>)}
                </span>
              </div>
              <strong className={cx('svg-item-title')}>{name}</strong>
            </li>
          )}
        </ListMap>
      </ul>
    </article>
  );
};

export default SvgFinder;
