import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductDetailApi, getProductsApi } from '../../util/api';
import heroWatchImage from '../../assets/stitch_timelux_watch_store_ui/hero-watch/screen.png';
import roseGoldWatchImage from '../../assets/stitch_timelux_watch_store_ui/rose-gold-watch/screen.png';
import diamondWatchImage from '../../assets/stitch_timelux_watch_store_ui/diamond-watch/screen.png';
import smartWatchImage from '../../assets/stitch_timelux_watch_store_ui/smart-watch/screen.png';
import chronographWatchImage from '../../assets/stitch_timelux_watch_store_ui/chronograph-watch/screen.png';

const productImages = {
    hero: heroWatchImage,
    roseGold: roseGoldWatchImage,
    diamond: diamondWatchImage,
    smart: smartWatchImage,
    chronograph: chronographWatchImage,
};

const getProductImages = (product) => {
    if (product.images?.length > 0) return product.images;
    if (product.imageKeys?.length > 0) {
        return product.imageKeys.map((key) => productImages[key] || productImages.hero);
    }
    return [productImages.hero];
};

const normalizeProduct = (product) => ({
    ...product,
    images: getProductImages(product),
});

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (filters, { rejectWithValue }) => {
        try {
            const res = await getProductsApi(filters);

            if (res?.errCode === 0) {
                return res.products;
            }

            return rejectWithValue(res);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await getProductDetailApi(id);

            if (res?.errCode === 0) {
                return res.product;
            }

            return rejectWithValue(res);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const watchProducts = [
    {
        id: 'watch-1',
        name: 'Chronos Heritage Squelette',
        category: 'Luxury Watches',
        brand: 'Chronos Suisse',
        price: 195000,
        salePrice: 182500,
        discount: 15,
        stock: 2,
        sold: 1,
        isPromotion: true,
        isNewest: false,
        isBestSeller: true,
        images: [
            productImages.hero,
            productImages.diamond,
            productImages.chronograph,
        ],
        description: 'Mẫu đồng hồ có thiết kế lộ máy sang trọng, dành cho người yêu phong cách cổ điển và tinh xảo.',
        specs: {
            material: '18k Rose Gold & Sapphire Crystal',
            movement: 'Skeleton Mechanical',
            waterResistance: '5 ATM',
            warranty: '5 Years',
        },
    },
    {
        id: 'watch-2',
        name: 'Aurelia Rose Mesh',
        category: "Women's Watches",
        brand: 'Aurelia',
        price: 1500,
        salePrice: 1250,
        discount: 17,
        stock: 8,
        sold: 124,
        isPromotion: true,
        isNewest: true,
        isBestSeller: true,
        images: [
            productImages.roseGold,
            productImages.hero,
            productImages.diamond,
        ],
        description: 'Đồng hồ mặt tròn thanh lịch với dây mesh màu rose gold, phù hợp phong cách tối giản.',
        specs: {
            material: 'Rose Gold Stainless Steel',
            movement: 'Quartz',
            waterResistance: '3 ATM',
            warranty: '2 Years',
        },
    },
    {
        id: 'watch-3',
        name: 'Vanguard Smart Terrain',
        category: 'Smart Watches',
        brand: 'Vanguard',
        price: 5500,
        salePrice: 4800,
        discount: 10,
        stock: 15,
        sold: 48,
        isPromotion: true,
        isNewest: true,
        isBestSeller: false,
        images: [
            productImages.smart,
            productImages.chronograph,
            productImages.hero,
        ],
        description: 'Đồng hồ thông minh cao cấp, hỗ trợ theo dõi sức khỏe và các tính năng cho người hay di chuyển.',
        specs: {
            material: 'Titanium Case & Silicone Strap',
            movement: 'Smart Digital',
            waterResistance: '10 ATM',
            warranty: '2 Years',
        },
    },
    {
        id: 'watch-4',
        name: 'Celestial Chrono II',
        category: "Men's Watches",
        brand: 'Celestial',
        price: 9200,
        salePrice: 8450,
        discount: 8,
        stock: 5,
        sold: 2,
        isPromotion: false,
        isNewest: true,
        isBestSeller: false,
        images: [
            productImages.chronograph,
            productImages.hero,
            productImages.diamond,
        ],
        description: 'Đồng hồ chronograph nam với mặt số mạnh mẽ, phù hợp cả công việc và sự kiện trang trọng.',
        specs: {
            material: 'Stainless Steel',
            movement: 'Automatic Chronograph',
            waterResistance: '10 ATM',
            warranty: '3 Years',
        },
    },
    {
        id: 'watch-5',
        name: 'Swiss Legacy 1924',
        category: 'Luxury Watches',
        brand: 'Swiss Legacy',
        price: 50000,
        salePrice: 45000,
        discount: 10,
        stock: 1,
        sold: 9,
        isPromotion: false,
        isNewest: false,
        isBestSeller: true,
        images: [
            productImages.diamond,
            productImages.hero,
            productImages.chronograph,
        ],
        description: 'Phiên bản di sản lấy cảm hứng từ đồng hồ Thụy Sĩ năm 1924, số lượng giới hạn.',
        specs: {
            material: 'Platinum Case & Leather Strap',
            movement: 'Swiss Automatic',
            waterResistance: '5 ATM',
            warranty: '5 Years',
        },
    },
    {
        id: 'watch-6',
        name: 'Rose Gold Minimal',
        category: "Women's Watches",
        brand: 'Minimal Maison',
        price: 1300,
        salePrice: 1200,
        discount: 5,
        stock: 12,
        sold: 342,
        isPromotion: false,
        isNewest: false,
        isBestSeller: true,
        images: [
            productImages.roseGold,
            productImages.smart,
            productImages.hero,
        ],
        description: 'Đồng hồ nữ màu rose gold với thiết kế gọn gàng, dễ phối với trang phục hằng ngày.',
        specs: {
            material: 'Rose Gold Stainless Steel',
            movement: 'Quartz',
            waterResistance: '3 ATM',
            warranty: '2 Years',
        },
    },
    {
        id: 'watch-7',
        name: 'Navigator Steel',
        category: "Men's Watches",
        brand: 'Navigator',
        price: 6800,
        salePrice: 6100,
        discount: 10,
        stock: 7,
        sold: 58,
        isPromotion: true,
        isNewest: false,
        isBestSeller: true,
        images: [
            productImages.chronograph,
            productImages.hero,
            productImages.smart,
        ],
        description: 'Đồng hồ nam dây thép, mặt số rõ ràng, phù hợp người thích phong cách mạnh mẽ.',
        specs: {
            material: 'Stainless Steel',
            movement: 'Automatic',
            waterResistance: '10 ATM',
            warranty: '3 Years',
        },
    },
    {
        id: 'watch-8',
        name: 'Luna Pearl',
        category: "Women's Watches",
        brand: 'Luna',
        price: 2400,
        salePrice: 2200,
        discount: 0,
        stock: 10,
        sold: 77,
        isPromotion: false,
        isNewest: true,
        isBestSeller: false,
        images: [
            productImages.roseGold,
            productImages.diamond,
            productImages.hero,
        ],
        description: 'Thiết kế nữ tính với tông sáng, phù hợp đi làm hoặc dự tiệc nhẹ.',
        specs: {
            material: 'Pearl Dial & Steel Case',
            movement: 'Quartz',
            waterResistance: '3 ATM',
            warranty: '2 Years',
        },
    },
    {
        id: 'watch-9',
        name: 'Titan Active Pro',
        category: 'Smart Watches',
        brand: 'Titan',
        price: 3900,
        salePrice: 3500,
        discount: 10,
        stock: 20,
        sold: 96,
        isPromotion: true,
        isNewest: true,
        isBestSeller: true,
        images: [
            productImages.smart,
            productImages.chronograph,
            productImages.roseGold,
        ],
        description: 'Đồng hồ thông minh cho luyện tập, theo dõi sức khỏe và thông báo hằng ngày.',
        specs: {
            material: 'Aluminum Case & Silicone Strap',
            movement: 'Smart Digital',
            waterResistance: '5 ATM',
            warranty: '2 Years',
        },
    },
    {
        id: 'watch-10',
        name: 'Diamond Regent',
        category: 'Luxury Watches',
        brand: 'Regent',
        price: 76000,
        salePrice: 72000,
        discount: 5,
        stock: 3,
        sold: 11,
        isPromotion: true,
        isNewest: false,
        isBestSeller: false,
        images: [
            productImages.diamond,
            productImages.hero,
            productImages.roseGold,
        ],
        description: 'Mẫu đồng hồ cao cấp có điểm nhấn kim loại sáng và chi tiết sang trọng.',
        specs: {
            material: 'White Gold & Diamond Bezel',
            movement: 'Swiss Automatic',
            waterResistance: '5 ATM',
            warranty: '5 Years',
        },
    },
    {
        id: 'watch-11',
        name: 'Classic Black',
        category: "Men's Watches",
        brand: 'Classic',
        price: 3200,
        salePrice: 3200,
        discount: 0,
        stock: 14,
        sold: 61,
        isPromotion: false,
        isNewest: true,
        isBestSeller: false,
        images: [
            productImages.hero,
            productImages.chronograph,
            productImages.diamond,
        ],
        description: 'Đồng hồ dây da đen, dễ dùng trong nhiều hoàn cảnh và không quá cầu kỳ.',
        specs: {
            material: 'Leather Strap & Steel Case',
            movement: 'Quartz',
            waterResistance: '3 ATM',
            warranty: '2 Years',
        },
    },
    {
        id: 'watch-12',
        name: 'Aurora Mesh',
        category: "Women's Watches",
        brand: 'Aurora',
        price: 1800,
        salePrice: 1650,
        discount: 8,
        stock: 9,
        sold: 44,
        isPromotion: true,
        isNewest: false,
        isBestSeller: false,
        images: [
            productImages.roseGold,
            productImages.smart,
            productImages.hero,
        ],
        description: 'Mẫu dây mesh nhẹ, tông rose gold dễ phối đồ và phù hợp sử dụng hằng ngày.',
        specs: {
            material: 'Rose Gold Steel Mesh',
            movement: 'Quartz',
            waterResistance: '3 ATM',
            warranty: '2 Years',
        },
    },
    {
        id: 'watch-13',
        name: 'Pulse Square',
        category: 'Smart Watches',
        brand: 'Pulse',
        price: 2800,
        salePrice: 2500,
        discount: 11,
        stock: 18,
        sold: 103,
        isPromotion: true,
        isNewest: true,
        isBestSeller: true,
        images: [
            productImages.smart,
            productImages.hero,
            productImages.chronograph,
        ],
        description: 'Đồng hồ thông minh mặt vuông, giao diện hiện đại và pin dùng tốt cho cả ngày.',
        specs: {
            material: 'Aluminum & Silicone',
            movement: 'Smart Digital',
            waterResistance: '5 ATM',
            warranty: '2 Years',
        },
    },
    {
        id: 'watch-14',
        name: 'Royal Tourbillon',
        category: 'Luxury Watches',
        brand: 'Royal',
        price: 120000,
        salePrice: 112000,
        discount: 7,
        stock: 1,
        sold: 5,
        isPromotion: true,
        isNewest: true,
        isBestSeller: false,
        images: [
            productImages.diamond,
            productImages.hero,
            productImages.chronograph,
        ],
        description: 'Phiên bản luxury số lượng rất ít, dành cho khách thích thiết kế nổi bật.',
        specs: {
            material: 'Platinum & Sapphire Crystal',
            movement: 'Tourbillon Mechanical',
            waterResistance: '5 ATM',
            warranty: '5 Years',
        },
    },
];

const initialState = {
    products: watchProducts.map(normalizeProduct),
    searchText: '',
    selectedCategory: 'All',
    maxPrice: 200000,
    promotionOnly: false,
    sortBy: 'newest',
    currentPage: 1,
    pageSize: 6,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
            state.currentPage = 1;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            state.currentPage = 1;
        },
        setMaxPrice: (state, action) => {
            state.maxPrice = Number(action.payload);
            state.currentPage = 1;
        },
        setPromotionOnly: (state, action) => {
            state.promotionOnly = action.payload;
            state.currentPage = 1;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = Number(action.payload);
        },
        resetProductFilters: (state) => {
            state.searchText = '';
            state.selectedCategory = 'All';
            state.maxPrice = 200000;
            state.promotionOnly = false;
            state.sortBy = 'newest';
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.map(normalizeProduct);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.errMessage || 'Không thể tải danh sách sản phẩm';
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                const product = normalizeProduct(action.payload);
                const currentIndex = state.products.findIndex((item) => item.id === product.id);

                if (currentIndex >= 0) {
                    state.products[currentIndex] = product;
                } else {
                    state.products.push(product);
                }
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.errMessage || 'Không thể tải chi tiết sản phẩm';
            });
    },
});

export const {
    setSearchText,
    setSelectedCategory,
    setMaxPrice,
    setPromotionOnly,
    setSortBy,
    setCurrentPage,
    resetProductFilters,
} = productSlice.actions;

export default productSlice.reducer;
