const translateMessage = {
  hello: 'world',
  HEADER_INFO: 'INFORMATION',
  HEADER_ROADMAP: 'ROADMAP',
  HEADER_TEAM: 'TEAM',
  HEADER_MINT: 'MINT',
  HEADER_DOGESPACE: 'DOGESPACE',
  HEADER_CONNECT: 'CONNECT WALLET',
  MERGE: 'MERGE',

  TITLE_INTRO: 'INTRODUCTION',
  TITLE_PREVIEW: 'PREVIEW',
  TITLE_ROADMAP: 'ROADMAP',
  TITLE_TEAM: 'TEAM MEMBER',

  TEAM_FOUNDER: 'FOUNDER',
  TEAM_ARTIST: 'ARTIST',
  TEAM_DEV: 'DEV',
  TEAM_MARKETING: 'MARKETING',
  TEAM_ADVISOR: 'ADVISOR',
  WHITEPAPER: 'WHITEPAPER',
  COPYRIGHT1: 'All rights reserved by DogeSpace.',
  COPYRIGHT2: '© 2022 DogeSpace.',

  // MING
  BUTTON_WL_MINT: '- Whitelist Mint -',
  BUTTON_MINT: '- Mint -',
  MINTPAGE_TITLE1: '- Mint -',
  MINTPAGE_DESC1: 'DogeSpace NFT is a collection of 10,100 generative NFTs, including 100 Founding Store NFTs and 10,000 DogeSpace NFT, each NFT has unique characteristics and attributes. DogeSpace NFT have different levels(Lv1-Lv5). According to different levels, there will be different  priority and commission, depending on the activities and projects.',
  MINTPAGE_TITLE2: '- Buying Rules -',
  MINTPAGE_DESC2: '50 Founding Store NFTs are open for bidding on OpenSea, 50 for DogeSpace strong partner and 10,000 Fortune Store NFTs sale on the official website',
  MINTPAGE_DESC3: 'The sale of 10,000 Fortune Store NFTs will including two phases',
  MINTPAGE_DESC4: '(whitelisted private sale and public sale)',
  MINTPAGE_DESC5: 'Presale price 0.168 ETH, public sale price 0.188 ETH',
  MINTPAGE_DESC6: 'The whitelist can guarantee the purchase and obtain an exclusive invitation code before the public sale',
  MINTPAGE_DESC7: 'Using the invitation code during the public sale, the referrer can get 30% commission',
  MINTPAGE_DESC8: 'There is no usage limit for invitation code. That is, the more invitations,  the more commissions you get.',
  MINTPAGE_TITLE3: '- Five different level are as follows -',
  MINTPAGE_TITLE4: '- Whitelist invitation code commission -',

  INVITAION_CODE: 'INVITAION CODE',
  SUBMIT: 'SUBMIT',
  CANCEL: 'CANCEL',
  PRESALE_TIME: 'Whitelist sale time',
  PUBLIC_TIME: 'Public sale time',

  DOGESPACEPAGE_TITLE1: '- DOGESPACE -',
  DOGESPACEPAGE_DESC1: 'Each DogeSpace NFT will have a unique invitation code. When customers purchase products on the platform, they need to enter the invitation code, and the NFT holder will receive the commission according to the NFT level. The higher the level, the higher the commission. The details will depend on the type of products and discount events. The commission rules for each product will be announced on the official website before launch.',
  DOGESPACEPAGE_DESC2: 'Holding DogeSpace NFT will becoming a merchant in Metaverse. When customers buy products on the platform, they need to enter an invitation code and that DogeSpace NFT holder can get a certain percentage of commissions. This percentage depends on the NFT level and project. DogeSpace will cooperate with many brands. In addition, people can cooperate with DogeSpace team and communities to promote products, using platform\'s resource to marketing, and provide a bridge for cooperation between various projects, like co-brand, attract more people from each other. ',
  DOGESPACEPAGE_DESC3: 'DogeSpace NFT have different levels. According to different levels, there will be different priority and commission, depending on the activities and projects. Exclusive events may include NFT airdrops, NFT whitelists, physical products discount or physical product giveaways. ',
  DOGESPACEPAGE_DESC4: '',
  DOGESPACEPAGE_DESC5: 'DogeSpace will use 60% of the platform\'s revenue to build a better community, buy bluechip projects, physical products or merch to give back to holders.',
  DOGESPACEPAGE_DESC6: 'ex: Buy Metaverse land, build a place for NFT holders to contact and communicate in Metaverse. furthermore, team will launch vote to buy current hot NFT projects for giveaways or buy physical products for community.',

  Base_mint_Price: 'Base mint Price',
  Total_Price: 'Total_Price',
  Presale_Price: 'Presale Price',
  COMMING_SOON: 'Comming Soon...',
  DOGESPACE_MINTED: 'DogeSpace minted.',
};
export type TranslateKeys = keyof typeof translateMessage;

export type TranslateMessageType = {
    [key in TranslateKeys]: string | Array<string>;
};

export default translateMessage;
