import styled from 'styled-components';

// import { SvgIcon } from '../../../features/icons/components/SvgIcon';
import { Search } from '@mui/icons-material';
import { Link } from '../../../foundation/components/Link';
import { Text } from '../../../foundation/components/Text';
import { Color, Radius, Space, Typography } from '../../../foundation/styles/variables';

const _Wrapper = styled.div`
  width: calc(100% + ${Space * 4}px);
  margin-left: -${Space * 2}px;
  margin-right: -${Space * 2}px;
  margin-top: -${Space * 2}px;
  position: relative;
`;

const _SearchLink = styled(Link)`
  position: absolute;
  right: ${Space * 1}px;
  top: 0;
  padding: ${Space * 1}px ${Space * 2}px;
  border: 2px solid ${Color.MONO_A};
  border-radius: ${Radius.X_LARGE};
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(50%);
`;

const _Image = styled.img`
  (max-width: 1024px) {
    width: 100vw;
  },
  height: 1024px;
`;

export const CoverSection: React.FC = () => {
  return (
    <_Wrapper>
      <_Image
        alt="Cyber-Toon"
        loading='eager'
        src="/assets/hero.webp"
        height={576}
        width={1024}
      />
      <_SearchLink to="/search">
        {/* <SvgIcon color={Color.MONO_A} height={24} type="Search" width={24} /> */}
        <Search style={{ color: Color.MONO_A, height: 24, width: 24 }} />
        <Text color={Color.MONO_A} typography={Typography.NORMAL16}>
          検索
        </Text>
      </_SearchLink>
    </_Wrapper>
  );
};
