import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, logoutUser } from '../redux/slices/authSlice';
import {
    fetchProducts,
    resetProductFilters,
    setMaxPrice,
    setCurrentPage,
    setPromotionOnly,
    setSearchText,
    setSelectedCategory,
    setSortBy,
} from '../redux/slices/productSlice';
import TimeLuxIcon from '../components/common/TimeLuxIcon';

const categories = [
    'All',
    "Men's Watches",
    "Women's Watches",
    'Smart Watches',
    'Luxury Watches',
];

const formatPrice = (price) => `$${Number(price).toLocaleString('en-US')}`;

const getUserName = (user) => {
    if (!user) return 'Member';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'Member';
};

const ProductCard = ({ product, onViewDetail }) => (
    <article className="group flex h-full flex-col border border-transparent bg-[#1e2020]/55 p-6 transition-all duration-500 hover:border-[#4d4635] hover:bg-[#1e2020] hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <div className="relative mb-7 aspect-square overflow-hidden bg-[#0c0f0f]">
            <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {product.discount > 0 && (
                <span className="absolute left-4 top-4 bg-[#f2ca50] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#241a00]">
                    {product.discount}% Off
                </span>
            )}
        </div>

        <div className="flex grow flex-col text-left">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d0c5af]">
                {product.category}
            </p>
            <h3 className="mb-3 text-2xl font-semibold leading-tight text-[#e2e2e2] transition-colors group-hover:text-[#f2ca50]">
                {product.name}
            </h3>
            <div className="mb-6 flex items-center gap-3">
                <span className="text-lg font-bold text-[#f2ca50]">{formatPrice(product.salePrice)}</span>
                <span className="text-sm text-[#d0c5af]/55 line-through">{formatPrice(product.price)}</span>
            </div>

            <div className="mb-7 mt-auto flex justify-between gap-4 text-sm">
                <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#99907c]">Tồn kho</p>
                    <p className="mt-1 text-[#e2e2e2]">{product.stock} chiếc</p>
                </div>
                <div className="text-right">
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#99907c]">Đã bán</p>
                    <p className="mt-1 text-[#e2e2e2]">{product.sold}</p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => onViewDetail(product.id)}
                className="inline-flex w-full items-center justify-center gap-2 border border-[#4d4635] py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e2e2e2] transition-all duration-300 hover:border-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#241a00]"
            >
                Xem chi tiết
                <span>→</span>
            </button>
        </div>
    </article>
);

const SectionHeading = ({ children }) => (
    <div className="mb-10 flex items-center gap-4">
        <span className="h-px w-12 bg-[#f2ca50]" />
        <h2 className="text-left text-2xl font-semibold uppercase tracking-[0.2em] text-[#e2e2e2]">
            {children}
        </h2>
    </div>
);

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const {
        products,
        searchText,
        selectedCategory,
        maxPrice,
        promotionOnly,
        sortBy,
        currentPage,
        pageSize,
        loading,
        error,
    } = useSelector((state) => state.products);

    useEffect(() => {
        if (!user) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, user]);

    useEffect(() => {
        dispatch(fetchProducts({
            search: searchText,
            category: selectedCategory,
            maxPrice,
            promotionOnly,
            sortBy,
        }));
    }, [dispatch, maxPrice, promotionOnly, searchText, selectedCategory, sortBy]);

    const filteredProducts = useMemo(() => {
        const result = products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesPrice = product.salePrice <= maxPrice;
            const matchesPromotion = !promotionOnly || product.isPromotion;

            return matchesSearch && matchesCategory && matchesPrice && matchesPromotion;
        });

        return [...result].sort((a, b) => {
            if (sortBy === 'best-selling') return b.sold - a.sold;
            if (sortBy === 'price-low') return a.salePrice - b.salePrice;
            if (sortBy === 'price-high') return b.salePrice - a.salePrice;
            return Number(b.isNewest) - Number(a.isNewest);
        });
    }, [maxPrice, products, promotionOnly, searchText, selectedCategory, sortBy]);

    const promotionProducts = filteredProducts.filter((product) => product.isPromotion);
    const newestProducts = filteredProducts.filter((product) => product.isNewest);
    const bestSellerProducts = filteredProducts.filter((product) => product.isBestSeller);
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);
    const defaultHeroProduct = products.find((product) => product.id === 'watch-1') || products[0];
    const categoryHeroProduct = filteredProducts[0] || defaultHeroProduct;
    const heroProduct = selectedCategory === 'All' ? defaultHeroProduct : categoryHeroProduct;
    const featuredBestSeller = bestSellerProducts[0] || products[0];
    const sideBestSellers = bestSellerProducts.slice(1, 3);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/login');
    };

    const handleViewDetail = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#121414] text-[#e2e2e2]">
            <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#4d4635]/40 bg-[#121414]/95 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
                    <div className="flex items-center gap-10">
                        <button
                            type="button"
                            onClick={() => navigate('/home')}
                            className="text-2xl font-bold uppercase tracking-[0.26em] text-[#f2ca50]"
                        >
                            TimeLux
                        </button>
                        <nav className="hidden items-center gap-8 lg:flex">
                            <button
                                type="button"
                                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                                className="border-b-2 border-[#f2ca50] pb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#f2ca50]"
                            >
                                Collections
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden lg:block">
                            <TimeLuxIcon name="search" size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#99907c]" />
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => dispatch(setSearchText(e.target.value))}
                                placeholder="Search masterpieces..."
                                className="w-64 border border-[#4d4635] bg-[#1e2020] py-2 pl-10 pr-3 text-xs text-[#e2e2e2] outline-none placeholder:text-[#d0c5af]/55 focus:border-[#f2ca50]"
                            />
                        </div>

                        <div className="hidden border-l border-[#4d4635] pl-5 text-right md:block">
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f2ca50]">{getUserName(user)}</p>
                            <p className="text-[10px] text-[#d0c5af]">{user?.email || 'member@timelux.com'}</p>
                        </div>

                        <button
                            type="button"
                            title="Hồ sơ"
                            onClick={() => navigate('/user/profile')}
                            className="text-[#d0c5af] transition-colors hover:text-[#f2ca50]"
                        >
                            <TimeLuxIcon name="user" size={21} />
                        </button>

                        <button
                            type="button"
                            title="Đăng xuất"
                            onClick={handleLogout}
                            className="text-[#d0c5af] transition-colors hover:text-red-300"
                        >
                            <TimeLuxIcon name="logout" size={21} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-20">
                <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
                    <img
                        src={heroProduct.images[0]}
                        alt={heroProduct.name}
                        className="absolute inset-0 h-full w-full scale-105 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121414]/55 to-[#121414]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#121414]/85 via-[#121414]/35 to-transparent" />

                    <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-end px-5 pb-20">
                        <div className="max-w-2xl text-left">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#f2ca50]">
                                Exclusively for collectors
                            </p>
                            <h1 className="mb-8 text-5xl font-semibold leading-none text-[#e2e2e2] md:text-7xl">
                                The Chronos Heritage <span className="italic text-[#f2ca50]">Squelette</span>
                            </h1>
                            <p className="mb-10 max-w-xl text-lg leading-8 text-[#d0c5af]">
                                Khám phá bộ sưu tập đồng hồ cao cấp dành riêng cho thành viên TimeLux.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => handleViewDetail(heroProduct.id)}
                                    className="inline-flex items-center justify-center gap-3 border border-[#f2ca50] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#f2ca50] transition-all hover:bg-[#f2ca50] hover:text-[#241a00]"
                                >
                                    Reserve Now <span>→</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="border border-[#4d4635] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#e2e2e2] transition-colors hover:border-[#e2e2e2]"
                                >
                                    View Catalog
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="catalog" className="mx-auto max-w-7xl px-5 py-20">
                    <div className="mb-16 space-y-8">
                        <div className="flex flex-col gap-6 border-b border-[#4d4635]/45 pb-6 xl:flex-row xl:items-end xl:justify-between">
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => dispatch(setSelectedCategory(category))}
                                        className={`pb-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
                                            selectedCategory === category
                                                ? 'border-b border-[#f2ca50] text-[#f2ca50]'
                                                : 'text-[#d0c5af] hover:text-[#e2e2e2]'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <select
                                    value={sortBy}
                                    onChange={(e) => dispatch(setSortBy(e.target.value))}
                                    className="border border-[#4d4635] bg-[#1e2020] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#d0c5af] outline-none focus:border-[#f2ca50]"
                                >
                                    <option value="newest">Mới nhất</option>
                                    <option value="best-selling">Bán chạy</option>
                                    <option value="price-low">Giá thấp đến cao</option>
                                    <option value="price-high">Giá cao đến thấp</option>
                                </select>
                                <button
                                    type="button"
                                    onClick={() => dispatch(resetProductFilters())}
                                    className="inline-flex items-center gap-2 border border-[#4d4635] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#e2e2e2] hover:border-[#f2ca50] hover:text-[#f2ca50]"
                                >
                                    <TimeLuxIcon name="filter" size={16} />
                                    Reset
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-5 border border-[#4d4635]/30 bg-[#1a1c1c] p-5 lg:grid-cols-[1fr_1fr_180px] lg:items-center">
                            <div className="relative lg:hidden">
                                <TimeLuxIcon name="search" size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#99907c]" />
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={(e) => dispatch(setSearchText(e.target.value))}
                                    placeholder="Tìm đồng hồ..."
                                    className="w-full border border-[#4d4635] bg-[#0c0f0f] py-3 pl-10 pr-4 text-sm text-[#e2e2e2] outline-none"
                                />
                            </div>

                            <label className="text-left text-sm text-[#d0c5af]">
                                Giá tối đa: <span className="text-[#f2ca50]">{formatPrice(maxPrice)}</span>
                                <input
                                    type="range"
                                    min="1000"
                                    max="200000"
                                    step="1000"
                                    value={maxPrice}
                                    onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                                    className="mt-3 w-full accent-[#f2ca50]"
                                />
                            </label>

                            <label className="flex items-center gap-3 text-sm text-[#d0c5af]">
                                <input
                                    type="checkbox"
                                    checked={promotionOnly}
                                    onChange={(e) => dispatch(setPromotionOnly(e.target.checked))}
                                    className="h-4 w-4 accent-[#f2ca50]"
                                />
                                Chỉ xem hàng khuyến mãi
                            </label>

                            <p className="text-right text-xs font-bold uppercase tracking-[0.16em] text-[#99907c]">
                                {filteredProducts.length} sản phẩm
                            </p>
                        </div>
                    </div>

                    {loading && (
                        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.16em] text-[#f2ca50]">
                            Đang tải sản phẩm...
                        </p>
                    )}

                    {error && (
                        <p className="mb-8 border border-red-300/40 bg-red-950/20 px-4 py-3 text-center text-sm text-red-200">
                            {error}
                        </p>
                    )}

                    {filteredProducts.length === 0 ? (
                        <div className="border border-dashed border-[#4d4635] px-6 py-20 text-center">
                            <h3 className="mb-2 text-2xl font-semibold text-[#e2e2e2]">Không có sản phẩm</h3>
                            <p className="text-[#d0c5af]">Không có sản phẩm phù hợp với bộ lọc hiện tại.</p>
                        </div>
                    ) : (
                        <>
                            <section className="mb-24">
                                <SectionHeading>Danh sách sản phẩm</SectionHeading>
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                                    {paginatedProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} onViewDetail={handleViewDetail} />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            disabled={currentPage === 1}
                                            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                                            className="border border-[#4d4635] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#d0c5af] transition-colors hover:border-[#f2ca50] hover:text-[#f2ca50] disabled:cursor-not-allowed disabled:opacity-35"
                                        >
                                            Trước
                                        </button>

                                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                            <button
                                                key={page}
                                                type="button"
                                                onClick={() => dispatch(setCurrentPage(page))}
                                                className={`h-11 w-11 border text-sm font-bold transition-colors ${
                                                    currentPage === page
                                                        ? 'border-[#f2ca50] bg-[#f2ca50] text-[#241a00]'
                                                        : 'border-[#4d4635] text-[#d0c5af] hover:border-[#f2ca50] hover:text-[#f2ca50]'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            type="button"
                                            disabled={currentPage === totalPages}
                                            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                                            className="border border-[#4d4635] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#d0c5af] transition-colors hover:border-[#f2ca50] hover:text-[#f2ca50] disabled:cursor-not-allowed disabled:opacity-35"
                                        >
                                            Sau
                                        </button>
                                    </div>
                                )}
                            </section>

                            {promotionProducts.length > 0 && (
                                <section className="mb-24">
                                    <SectionHeading>Đồng hồ khuyến mãi</SectionHeading>
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                                        {promotionProducts.slice(0, 3).map((product) => (
                                            <ProductCard key={product.id} product={product} onViewDetail={handleViewDetail} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {newestProducts.length > 0 && (
                                <section className="mb-24">
                                    <SectionHeading>Mẫu mới nhất</SectionHeading>
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                                        {newestProducts.slice(0, 4).map((product) => (
                                            <ProductCard key={product.id} product={product} onViewDetail={handleViewDetail} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            <section>
                                <SectionHeading>Bán chạy nhất</SectionHeading>
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                                    <div className="relative min-h-[440px] overflow-hidden bg-[#282a2b] lg:col-span-7">
                                        <img
                                            src={featuredBestSeller.images[0]}
                                            alt={featuredBestSeller.name}
                                            className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-transparent to-transparent" />
                                        <div className="absolute bottom-8 left-8 right-8 text-left">
                                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#f2ca50]">Master Piece No. 1</p>
                                            <h3 className="mb-5 text-4xl font-semibold text-[#e2e2e2] md:text-5xl">{featuredBestSeller.name}</h3>
                                            <button
                                                type="button"
                                                onClick={() => handleViewDetail(featuredBestSeller.id)}
                                                className="bg-[#f2ca50] px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#241a00]"
                                            >
                                                Purchase Now
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid gap-8 lg:col-span-5">
                                        {sideBestSellers.map((product) => (
                                            <button
                                                key={product.id}
                                                type="button"
                                                onClick={() => handleViewDetail(product.id)}
                                                className="group flex items-center gap-6 border border-[#4d4635]/25 bg-[#1e2020] p-6 text-left transition-colors hover:bg-[#282a2b]"
                                            >
                                                <div className="aspect-square w-28 shrink-0 overflow-hidden bg-[#0c0f0f]">
                                                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                                                </div>
                                                <div>
                                                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#d0c5af]">{product.category}</p>
                                                    <h4 className="mb-2 text-2xl font-semibold text-[#e2e2e2] group-hover:text-[#f2ca50]">{product.name}</h4>
                                                    <p className="text-[#f2ca50]">{formatPrice(product.salePrice)}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                </section>
            </main>

            <footer className="border-t border-[#4d4635]/30 bg-[#0c0f0f] px-5 py-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-[#d0c5af] md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold uppercase tracking-[0.24em] text-[#f2ca50]">TimeLux</h2>
                    <p>Trang bán đồng hồ dành cho thành viên.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
