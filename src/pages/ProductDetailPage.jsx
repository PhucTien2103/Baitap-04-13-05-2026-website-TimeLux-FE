import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserProfile, logoutUser } from '../redux/slices/authSlice';
import { fetchProductById } from '../redux/slices/productSlice';

const formatPrice = (price) => {
    return `$${Number(price).toLocaleString('en-US')}`;
};

const getUserName = (user) => {
    if (!user) return 'Member';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'Member';
};

const SmallProductCard = ({ product, onViewDetail }) => {
    return (
        <button
            type="button"
            onClick={() => onViewDetail(product.id)}
            className="group text-left"
        >
            <div className="mb-4 aspect-[4/5] overflow-hidden bg-[#0c0f0f]">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#d0c5af]">
                {product.category}
            </p>
            <h3 className="text-lg font-semibold text-[#e2e2e2] group-hover:text-[#f2ca50]">
                {product.name}
            </h3>
            <p className="mt-2 font-bold text-[#f2ca50]">{formatPrice(product.salePrice)}</p>
        </button>
    );
};

const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { products, loading } = useSelector((state) => state.products);
    const product = products.find((item) => item.id === id);

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!user) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, user]);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    const similarProducts = useMemo(() => {
        if (!product) return [];

        return products
            .filter((item) => item.category === product.category && item.id !== product.id)
            .slice(0, 3);
    }, [product, products]);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/login');
    };

    const handleMinus = () => {
        setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
    };

    const handlePlus = () => {
        if (!product) return;
        setQuantity((currentQuantity) => Math.min(product.stock, currentQuantity + 1));
    };

    const handlePreviousImage = () => {
        if (!product) return;
        setSelectedImageIndex((currentIndex) => {
            if (currentIndex === 0) return product.images.length - 1;
            return currentIndex - 1;
        });
    };

    const handleNextImage = () => {
        if (!product) return;
        setSelectedImageIndex((currentIndex) => {
            if (currentIndex === product.images.length - 1) return 0;
            return currentIndex + 1;
        });
    };

    if (!product && loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#121414] px-5 text-center text-[#e2e2e2]">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f2ca50]">
                    Đang tải chi tiết sản phẩm...
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#121414] px-5 text-center text-[#e2e2e2]">
                <div>
                    <h1 className="mb-4 text-3xl font-bold">Không tìm thấy sản phẩm</h1>
                    <button
                        type="button"
                        onClick={() => navigate('/home')}
                        className="border border-[#f2ca50] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#241a00]"
                    >
                        Về trang chủ
                    </button>
                </div>
            </div>
        );
    }

    const selectedImage = product.images[selectedImageIndex];
    const isOutOfStock = product.stock === 0;

    return (
        <div className="min-h-screen bg-[#121414] text-[#e2e2e2]">
            <header className="sticky top-0 z-40 border-b border-[#4d4635]/40 bg-[#121414]/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
                    <button
                        type="button"
                        onClick={() => navigate('/home')}
                        className="text-left text-2xl font-bold uppercase tracking-[0.28em] text-[#f2ca50]"
                    >
                        TimeLux
                    </button>

                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="text-left text-sm text-[#d0c5af] lg:text-right">
                            <p className="font-semibold text-[#f2ca50]">{getUserName(user)}</p>
                            <p>{user?.email || 'member@timelux.com'}</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/user/profile')}
                            className="border border-[#4d4635] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#d0c5af] hover:border-[#f2ca50] hover:text-[#f2ca50]"
                        >
                            Hồ sơ
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="border border-[#99907c] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#e2e2e2] hover:border-red-300 hover:text-red-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-5 py-10">
                <button
                    type="button"
                    onClick={() => navigate('/home')}
                    className="mb-10 text-sm font-bold uppercase tracking-[0.16em] text-[#d0c5af] hover:text-[#f2ca50]"
                >
                    ← Quay lại trang chủ
                </button>

                <section className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <div className="relative aspect-[4/5] overflow-hidden bg-[#0c0f0f]">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />

                            {product.images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={handlePreviousImage}
                                        className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[#f2ca50] bg-[#121414]/70 text-xl text-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#241a00]"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNextImage}
                                        className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[#f2ca50] bg-[#121414]/70 text-xl text-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#241a00]"
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="mt-5 grid grid-cols-3 gap-4">
                            {product.images.map((image, index) => (
                                <button
                                    type="button"
                                    key={image}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`aspect-square overflow-hidden border ${
                                        selectedImageIndex === index
                                            ? 'border-[#f2ca50]'
                                            : 'border-[#4d4635]/40 hover:border-[#f2ca50]/70'
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="mb-5 flex flex-wrap gap-3">
                            <span className="border border-[#f2ca50] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#f2ca50]">
                                {product.category}
                            </span>
                            {product.discount > 0 && (
                                <span className="bg-[#f2ca50] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#241a00]">
                                    {product.discount}% Off
                                </span>
                            )}
                        </div>

                        <h1 className="mb-4 text-left text-4xl font-bold text-[#e2e2e2] md:text-5xl">
                            {product.name}
                        </h1>

                        <p className="mb-8 text-left text-sm font-bold uppercase tracking-[0.2em] text-[#d0c5af]">
                            {product.brand}
                        </p>

                        <div className="mb-6 flex items-baseline gap-4">
                            <span className="text-3xl font-bold text-[#f2ca50]">
                                {formatPrice(product.salePrice)}
                            </span>
                            <span className="text-lg text-[#d0c5af]/60 line-through">
                                {formatPrice(product.price)}
                            </span>
                        </div>

                        <div className="mb-8 flex flex-wrap gap-5 border-y border-[#4d4635]/40 py-5 text-sm text-[#d0c5af]">
                            <span className={isOutOfStock ? 'text-red-300' : 'text-emerald-300'}>
                                {isOutOfStock ? 'Hết hàng' : 'Còn hàng'}
                            </span>
                            <span>Tồn kho: {product.stock}</span>
                            <span>Đã bán: {product.sold}</span>
                        </div>

                        <div className="mb-8">
                            <p className="mb-3 text-left text-sm font-bold uppercase tracking-[0.16em] text-[#d0c5af]">
                                Số lượng
                            </p>
                            <div className="flex h-14 w-44 border border-[#4d4635]">
                                <button
                                    type="button"
                                    onClick={handleMinus}
                                    className="w-14 text-xl text-[#d0c5af] hover:bg-[#282a2b] hover:text-[#f2ca50]"
                                >
                                    -
                                </button>
                                <span className="flex flex-1 items-center justify-center border-x border-[#4d4635] text-lg font-bold">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={handlePlus}
                                    disabled={isOutOfStock || quantity >= product.stock}
                                    className="w-14 text-xl text-[#d0c5af] hover:bg-[#282a2b] hover:text-[#f2ca50] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={isOutOfStock}
                            className="mb-10 w-full border border-[#f2ca50] px-5 py-5 text-sm font-bold uppercase tracking-[0.18em] text-[#f2ca50] transition-colors hover:bg-[#f2ca50] hover:text-[#241a00] disabled:cursor-not-allowed disabled:border-[#4d4635] disabled:text-[#d0c5af]/50"
                        >
                            Thêm vào giỏ hàng
                        </button>

                        <section className="mb-8 border-t border-[#4d4635]/40 pt-8 text-left">
                            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#e2e2e2]">
                                Mô tả sản phẩm
                            </h2>
                            <p className="leading-7 text-[#d0c5af]">{product.description}</p>
                        </section>

                        <section className="border-t border-[#4d4635]/40 pt-8 text-left">
                            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#e2e2e2]">
                                Thông số đồng hồ
                            </h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between gap-6 border-b border-[#4d4635]/30 pb-3">
                                    <span className="text-[#d0c5af]">Brand</span>
                                    <span>{product.brand}</span>
                                </div>
                                <div className="flex justify-between gap-6 border-b border-[#4d4635]/30 pb-3">
                                    <span className="text-[#d0c5af]">Material</span>
                                    <span className="text-right">{product.specs.material}</span>
                                </div>
                                <div className="flex justify-between gap-6 border-b border-[#4d4635]/30 pb-3">
                                    <span className="text-[#d0c5af]">Movement</span>
                                    <span className="text-right">{product.specs.movement}</span>
                                </div>
                                <div className="flex justify-between gap-6 border-b border-[#4d4635]/30 pb-3">
                                    <span className="text-[#d0c5af]">Water Resistance</span>
                                    <span>{product.specs.waterResistance}</span>
                                </div>
                                <div className="flex justify-between gap-6">
                                    <span className="text-[#d0c5af]">Warranty</span>
                                    <span>{product.specs.warranty}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

                {similarProducts.length > 0 && (
                    <section className="mt-20">
                        <div className="mb-8 flex items-center gap-4">
                            <span className="h-px w-12 bg-[#f2ca50]" />
                            <h2 className="text-left text-2xl font-semibold uppercase tracking-[0.2em]">
                                Sản phẩm tương tự
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {similarProducts.map((similarProduct) => (
                                <SmallProductCard
                                    key={similarProduct.id}
                                    product={similarProduct}
                                    onViewDetail={(productId) => navigate(`/products/${productId}`)}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default ProductDetailPage;
