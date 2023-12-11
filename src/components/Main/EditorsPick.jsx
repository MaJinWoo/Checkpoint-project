import { useQuery } from '@tanstack/react-query';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchStores } from '../../api/stores';
import Background2 from '../../assets/Background2.png';
import BookstoreImg from '../../assets/BookstoreImg.jpg';
import { storage } from '../../firebase';
import theme from '../../styles/theme';

const range = (length) => {
  return [...Array(length)].map((_, i) => {
    return i;
  });
};

function EditorsPick() {
  const navigate = useNavigate();
  const [imageList, setImageList] = useState([]);
  const [swiperEndNumber, setSwiperEndNumber] = useState(0);

  const { isLoading, isError, data: stores } = useQuery({ queryKey: ['stores'], queryFn: fetchStores });

  const downloadURL = async (id) => {
    try {
      const listRef = ref(storage, id);
      const res = await listAll(listRef);
      if (res.items.length > 0) {
        const firstFileRef = res.items[0];
        const url = await getDownloadURL(firstFileRef);
        return url;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting files: ', error);
      return null;
    }
  };

  useEffect(() => {
    const downloadAllUrls = async () => {
      if (stores) {
        try {
          const downloadPromises = stores.map((store) => downloadURL(store.id));
          const results = await Promise.all(downloadPromises);
          setImageList(results.flat());
        } catch (error) {
          console.error('Error downloading images: ', error);
        }
      }
    };
    if (!isLoading && !isError) {
      downloadAllUrls();
      setSwiperEndNumber(Math.ceil(stores.length / 9));
    }
  }, [stores, isLoading, isError]);

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h3>Editor's Pick</h3>
      <StyledSwiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {range(swiperEndNumber).map((page) => {
          return (
            <StyledSwiperSlide key={page}>
              <CardContainer>
                {stores.slice(page * 9, (page + 1) * 9).map((item, index) => {
                  return (
                    <SingleCard className="single-card" key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
                      <img
                        src={
                          imageList.find((img, idx) => idx === index)
                            ? imageList.find((img, idx) => idx === index)
                            : BookstoreImg
                        }
                        alt="store"
                      />
                      <TextContainer>
                        <h5>{item.name}</h5>
                        <p>{item.address}</p>
                      </TextContainer>
                    </SingleCard>
                  );
                })}
              </CardContainer>
            </StyledSwiperSlide>
          );
        })}
      </StyledSwiper>
    </Container>
  );
}

export default EditorsPick;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  padding: 30px 50px;
  row-gap: 20px;

  background-image: url(${Background2});
  background-size: contain;
  border-radius: 10px;

  & h3 {
    font-size: 35px;
    font-family: 'Cafe24-Regular';
    padding: 20px 0;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
`;
const SingleCard = styled.div`
  display: flex;
  flex-direction: column;

  height: 400px;
  border-radius: 20px;
  background-color: ${theme.color.sub};
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  & img {
    height: 300px;
    object-fit: fill;
    background-color: lightcoral;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  padding: 20px;
  font-family: 'Gowoon-Regular';

  & h5 {
    font-family: 'Cafe24-Regular';
    font-size: 20px;
  }

  & p {
    padding-right: 30px;
    color: gray;
  }
`;

const StyledSwiper = styled(Swiper)`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 40px 40px 40px;
`;
const StyledSwiperSlide = styled(SwiperSlide)`
  width: 1100px;
  height: 100%;
`;
