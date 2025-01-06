import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { useMemo } from 'react';
import Carousel, { CarouselProps } from '@/components/carousel/Carousel';
import useWemixplayUI from '@/hooks/useWemixplayUI';

type StoryComponent = StoryObj<typeof Carousel>;
type StoryTemplate = StoryFn<typeof Carousel>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Carousel,
  tags: ['autodocs']
} as Meta<typeof Carousel>;

const SlideTemplate: StoryTemplate = (args) => {
  const { theme } = useWemixplayUI();

  return (
    <div>
      <Carousel
        {...Object.entries(args).reduce((acc, [key, value]) => {
          return value._isMockFunction ? acc : { ...acc, [key]: value };
        }, {} as CarouselProps)}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            style={{
              padding: '40px 0',
              fontSize: 16,
              fontWeight: 900,
              textAlign: 'center',
              border: '1px solid',
              backgroundColor: 'var(--wp-semantic-static-gray05)'
            }}
          >
            <strong>{index + 1}</strong>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export const SlideDefault: StoryComponent = {
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    className: 'test-slide',
    slidesPerView: 1,
    threshold: 5,
    longSwipesMs: 1000,
    spaceBetween: 10,
    initialSlide: 0,
    speed: 1000,
    navigation: true,
    pagination: true,
    effect: 'slide',
    allowTouchMove: true,
    isLoading: false,
    loop: true,
    autoplay: false,
    skeletonCount: 3,
    skeletonElement: <div>skeleton</div>
  },
  render: SlideTemplate
};
