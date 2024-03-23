import React, { Suspense } from 'react';

import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Spacer } from '../../foundation/components/Spacer';
import { Space } from '../../foundation/styles/variables';
import { PickUp } from './PickUp';
import { Ranking } from './Ranking';
import { Release } from './Release';
import { CoverSection } from './internal/CoverSection';

const TopPage: React.FC = () => {

  return (
    <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
      <Box as="header" maxWidth="100%" width="100%">
        <CoverSection />
      </Box>
      <Box as="main" maxWidth="100%" width="100%">
        <PickUp />
        <Spacer height={Space * 2} />
        <Ranking />
        <Spacer height={Space * 2} />
        <Release />    
      </Box>
    </Flex>
  );
};

const TopPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={<div style={{height: "100vh"}}></div>}>
      <TopPage />
    </Suspense>
  );
};

export { TopPageWithSuspense as TopPage };
