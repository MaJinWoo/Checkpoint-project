import MapTest from '../components/MapTest';
import { Container as MapDiv } from 'react-naver-maps';

export default function TestPage() {
  return (
    <MapDiv
      style={{
        width: '100%',
        height: '600px'
      }}
    >
      <MapTest />
    </MapDiv>
  );
}
