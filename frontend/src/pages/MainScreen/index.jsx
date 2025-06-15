// src/screens/MainScreen/MainScreen.js (or wherever it's located)
import React, { useState, useEffect } from 'react';
import { Box, useTheme, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useParams, useNavigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import ScrollTop from '../../components/common/ScrollTop';
import ItemListSection from './components/ItemListSection';

import {
  categories as allCategoriesData,
  featuredItems as featuredItemsData,
  howItWorksSteps as howItWorksStepsData,
  slides as heroSlidesData,
  allMarketItems
} from '../../constants/datas';

const MainScreen = (props) => {
  const theme = useTheme();
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    categories: false,
    featured: false,
    howItWorks: false,
    stats: false,
    recentSwaps: false,
    categoryItems: false,
  });

  const [currentSelectedCategory, setCurrentSelectedCategory] = useState(null);
  const [currentCategorySpecificItems, setCurrentCategorySpecificItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleSections({
        hero: true,
        categories: true,
        featured: true,
        howItWorks: true,
        stats: true,
        recentSwaps: true,
        categoryItems: true,
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (categoryId) {
      const foundCategory = allCategoriesData.find(
        (cat) => cat.id.toString() === categoryId.toString()
      );
      if (foundCategory) {
        setCurrentSelectedCategory(foundCategory);
        const filteredItems = allMarketItems.filter(
          (item) => item.category === foundCategory.title
        );
        setCurrentCategorySpecificItems(filteredItems);
      } else {
        setCurrentSelectedCategory(null);
        setCurrentCategorySpecificItems([]);
        // navigate('/'); // Optional: redirect if category not found
      }
    } else {
      setCurrentSelectedCategory(null);
      setCurrentCategorySpecificItems([]);
    }
    window.scrollTo(0, 0);
  }, [categoryId, navigate]);

  const clearCategorySelectionAndNavigateHome = () => {
    navigate('/');
  };


  const sectionVerticalSpacing = { xs: 4, sm: 5, md: 1 }; // Adjust as needed (theme.spacing units)

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, pb: sectionVerticalSpacing }}> {/* Added padding bottom to the whole page */}
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top" sx={{backgroundColor:theme.palette.secondary.main,}}>
          <KeyboardArrowUpIcon/>
        </Fab>
      </ScrollTop>

      {!currentSelectedCategory ? (
        <>
          <Box id="hero-section">
            <HeroSection theme={theme} slides={heroSlidesData} visible={visibleSections.hero} />
          </Box>

          <Box
            id="featured-items-section"
          >
            <ItemListSection
              theme={theme}
              visible={visibleSections.featured}
              items={featuredItemsData.slice(0,4)}
              title="Öne Çıkan Takaslar"
              subtitle="En popüler ve ilgi çeken takas teklifleri"
              showViewMore={true}
              viewMoreText="Tüm Öne Çıkanları Gör"
              viewMoreAction={() => console.log("Navigate to all featured items page")}
            />
          </Box>

          <Box
            id="how-it-works-section"
            sx={{
              mt: sectionVerticalSpacing, 
             }}
          >
            <HowItWorksSection
              theme={theme}
              visible={visibleSections.howItWorks}
              howItWorksSteps={howItWorksStepsData}
            />
          </Box>
        </>
      ) : (
        // When a category is selected, ItemListSection should also align and have similar top margin as HeroSection
        <Box
          id="category-items-section"
          sx={{
            mt: 10, 
          }}
        >
          <ItemListSection
            theme={theme}
            visible={visibleSections.categoryItems}
            items={currentCategorySpecificItems}
            title={`${currentSelectedCategory.title} Kategorisindeki Ürünler`}
            subtitle={`Aradığın ${currentSelectedCategory.title.toLowerCase()} ürünlerini burada bulabilirsin.`}
            onClearCategory={clearCategorySelectionAndNavigateHome}
          />
        </Box>
      )}
    </Box>
  );
};

export default MainScreen;