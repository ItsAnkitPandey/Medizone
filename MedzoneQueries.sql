CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) UNIQUE,
    date_of_birth DATE,
    gender VARCHAR(10),
    is_active BOOLEAN DEFAULT TRUE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    role VARCHAR(20) DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- Index for faster email lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone_number);


create table user_profiles (
profile_id BIGSERIAL primary key,
user_id bigint not null unique,
profile_pic_url varchar(500),
preffered_language varchar(10) default 'en',
newsletter_subscribed boolean default false,
sms_notification boolean default true,
email_notification boolean default true,
blood_group varchar(3),
allergies text,
chronic_conditions TEXT,
emergency_contact_name VARCHAR(100),
emergency_contact_phone VARCHAR(15),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
foreign key(user_id) references users(user_id) on delete cascade 
)

CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);


CREATE TABLE user_addresses (
    address_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address_type VARCHAR(20) NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    country VARCHAR(50) NOT NULL DEFAULT 'India',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);

CREATE TABLE user_roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    permissions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO user_roles (role_name, description, permissions) VALUES
('CUSTOMER', 'Regular customer with basic access', '["view_products","place_order","view_orders"]'),
('ADMIN', 'Administrator with full access', '["*"]'),
('PHARMACIST', 'Pharmacist with product management access', '["view_products","manage_products","view_orders"]'),
('MANAGER', 'Manager with business operations access', '["view_orders","manage_orders","view_reports"]');

CREATE TABLE password_reset_tokens (
    token_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiry_date TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);

-- Auto-delete expired tokens (optional cleanup)
CREATE INDEX idx_password_reset_tokens_expiry ON password_reset_tokens(expiry_date);


CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    parent_category_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_category_id);

-- Insert your categories
INSERT INTO categories (category_name, slug, description) VALUES
('Medicines', 'medicines', 'Prescription and OTC medicines'),
('Baby Care', 'baby-care', 'Baby care products and essentials'),
('Personal Care', 'personal-care', 'Personal hygiene and care products'),
('Covid Essentials', 'covid-essentials', 'COVID-19 protection and essentials'),
('Equipments', 'equipments', 'Medical equipment and devices');

CREATE TABLE products (
    product_id BIGSERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    manufacturer VARCHAR(200),
    brand VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    mrp DECIMAL(10,2),
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    prescription_required BOOLEAN DEFAULT FALSE,
    pack_size VARCHAR(50),
    composition TEXT,
    dosage_form VARCHAR(50),
    expiry_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_name ON products(product_name);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_featured ON products(is_featured);


CREATE TABLE product_images (
    image_id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_primary ON product_images(product_id, is_primary);






CREATE TABLE product_categories (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE,
    UNIQUE(product_id, category_id)
);

CREATE INDEX idx_product_categories_product ON product_categories(product_id);
CREATE INDEX idx_product_categories_category ON product_categories(category_id);

CREATE TABLE product_reviews (
    review_id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    helpful_count INT DEFAULT 0,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE(product_id, user_id)
);

CREATE INDEX idx_product_reviews_product ON product_reviews(product_id);
CREATE INDEX idx_product_reviews_user ON product_reviews(user_id);
CREATE INDEX idx_product_reviews_rating ON product_reviews(rating);




-- Insert all products into products table
-- Note: Image URLs will need to be updated with actual hosted URLs

INSERT INTO products (
    product_id, 
    product_name, 
    slug, 
    description, 
    price, 
    mrp, 
    discount_percentage,
    dosage_form,
    is_active,
    is_featured
) VALUES
-- Medicines (1-28)
(1, 'Crocine', 'crocine', 'Headache', 30.00, 35.00, 14.29, 'Tablet', TRUE, TRUE),
(2, 'Aciloc', 'aciloc', 'Acidity', 40.00, 45.00, 11.11, 'Tablet', TRUE, FALSE),
(3, 'Calpol', 'calpol', 'Headache Body Pain', 13.00, 15.00, 13.33, 'Tablet', TRUE, FALSE),
(4, 'Vicks Action 500', 'vicks-action-500', 'Cold & Cough', 59.00, 70.00, 15.71, 'Tablet', TRUE, FALSE),
(5, 'Disprin', 'disprin', 'Headache', 14.00, 18.00, 22.22, 'Tablet', TRUE, FALSE),
(6, 'Metrogyl', 'metrogyl', 'Loose Motion', 21.00, 25.00, 16.00, 'Tablet', TRUE, FALSE),
(7, 'Omee', 'omee', 'Acidity', 55.00, 65.00, 15.38, 'Capsule', TRUE, FALSE),
(8, 'Liv 52', 'liv-52', 'Liver', 120.00, 140.00, 14.29, 'Tablet', TRUE, TRUE),
(9, 'Pentop DSR', 'pentop-dsr', 'Gas & Acidity', 119.00, 140.00, 15.00, 'Capsule', TRUE, FALSE),
(10, 'Corex Syrup', 'corex-syrup', 'Cough', 121.00, 145.00, 16.55, 'Syrup', TRUE, TRUE),
(11, 'Cetirizine', 'cetirizine', 'Allergy', 18.00, 22.00, 18.18, 'Tablet', TRUE, FALSE),
(12, 'Paracetamol', 'paracetamol', 'Body Pain & Fever', 6.00, 8.00, 25.00, 'Tablet', TRUE, TRUE),
(13, 'Tylenol', 'tylenol', 'Flu & Cold', 200.00, 230.00, 13.04, 'Tablet', TRUE, FALSE),
(14, 'Panadol', 'panadol', 'Flu & Cold', 58.00, 68.00, 14.71, 'Tablet', TRUE, FALSE),
(15, 'Codral', 'codral', 'Flu & Cold', 32.00, 40.00, 20.00, 'Tablet', TRUE, FALSE),
(16, 'Zeerodol', 'zeerodol', 'Pain', 49.00, 60.00, 18.33, 'Tablet', TRUE, FALSE),
(17, 'Aldigesic', 'aldigesic', 'Pain', 63.00, 75.00, 16.00, 'Tablet', TRUE, FALSE),
(18, 'Combiflam', 'combiflam', 'Pain', 39.00, 48.00, 18.75, 'Tablet', TRUE, TRUE),
(19, 'Acnezox Gel', 'acnezox-gel', 'Pimples', 15.00, 20.00, 25.00, 'Gel', TRUE, FALSE),
(20, 'Persol Gel', 'persol-gel', 'Pimples', 106.00, 125.00, 15.20, 'Gel', TRUE, FALSE),
(21, 'NeoClean', 'neoclean', 'Pimples', 135.00, 160.00, 15.63, 'Gel', TRUE, FALSE),
(22, 'Sidpiles', 'sidpiles', 'Piles', 165.00, 190.00, 13.16, 'Tablet', TRUE, FALSE),
(23, 'Pilex', 'pilex', 'Piles', 160.00, 185.00, 13.51, 'Tablet', TRUE, FALSE),
(24, 'Arsh Kalp', 'arsh-kalp', 'Piles', 108.00, 130.00, 16.92, 'Tablet', TRUE, FALSE),
(25, 'Solvin Cough Syrup', 'solvin-cough-syrup', 'Cough', 73.00, 88.00, 17.05, 'Syrup', TRUE, FALSE),
(26, 'Benadryl Cough Syrup', 'benadryl-cough-syrup', 'Cough', 120.00, 145.00, 17.24, 'Syrup', TRUE, TRUE),
(27, 'Ashthakind Syrup', 'ashthakind-syrup', 'Cough', 70.40, 85.00, 17.18, 'Syrup', TRUE, FALSE),
(28, 'Torex Syrup', 'torex-syrup', 'Cough', 78.00, 95.00, 17.89, 'Syrup', TRUE, FALSE);

-- Reset the sequence to continue from 29
ALTER SEQUENCE products_product_id_seq RESTART WITH 29;

-- Assign products to categories
-- Get category IDs first (assuming you already inserted them)
-- Medicines category (most products)
INSERT INTO product_categories (product_id, category_id) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), 
(9, 1), (10, 1), (11, 1), (12, 1), (13, 1), (14, 1), (15, 1), 
(16, 1), (17, 1), (18, 1), (22, 1), (23, 1), (24, 1), 
(25, 1), (26, 1), (27, 1), (28, 1);

-- Personal Care (skin care gels)
INSERT INTO product_categories (product_id, category_id) VALUES
(19, 3), (20, 3), (21, 3);

-- Insert product images (you'll need to host these images and update URLs)
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order) VALUES
(1, '/images/crocine.webp', 'Crocine', TRUE, 1),
(2, '/images/aciloc.webp', 'Aciloc', TRUE, 1),
(3, '/images/calpol.jpg', 'Calpol', TRUE, 1),
(4, '/images/vicks.jpg', 'Vicks Action 500', TRUE, 1),
(5, '/images/disprin.jpg', 'Disprin', TRUE, 1),
(6, '/images/metrogyl.jpg', 'Metrogyl', TRUE, 1),
(7, '/images/omee.webp', 'Omee', TRUE, 1),
(8, '/images/liv52.webp', 'Liv 52', TRUE, 1),
(9, '/images/pentop.jpg', 'Pentop DSR', TRUE, 1),
(10, '/images/corex.jpg', 'Corex Syrup', TRUE, 1),
(11, '/images/cetirizine.webp', 'Cetirizine', TRUE, 1),
(12, '/images/paracetamol.webp', 'Paracetamol', TRUE, 1),
(13, '/images/tylenol.jpg', 'Tylenol', TRUE, 1),
(14, '/images/Panadol.png', 'Panadol', TRUE, 1),
(15, '/images/codral.jpg', 'Codral', TRUE, 1),
(16, '/images/zeerodol.jpg', 'Zeerodol', TRUE, 1),
(17, '/images/aldigesic.jpg', 'Aldigesic', TRUE, 1),
(18, '/images/combiflam.webp', 'Combiflam', TRUE, 1),
(19, '/images/acnezox.jpg', 'Acnezox Gel', TRUE, 1),
(20, '/images/persol.jpg', 'Persol Gel', TRUE, 1),
(21, '/images/neoclean.webp', 'NeoClean', TRUE, 1),
(22, '/images/sidpiles.jpg', 'Sidpiles', TRUE, 1),
(23, '/images/pilex.jpg', 'Pilex', TRUE, 1),
(24, '/images/arshkalp.jpg', 'Arsh Kalp', TRUE, 1),
(25, '/images/solvin.jpg', 'Solvin Cough Syrup', TRUE, 1),
(26, '/images/benadryl.webp', 'Benadryl Cough Syrup', TRUE, 1),
(27, '/images/asthakind.jpg', 'Ashthakind Syrup', TRUE, 1),
(28, '/images/torex.png', 'Torex Syrup', TRUE, 1);

-- Verify insertion
SELECT COUNT(*) as total_products FROM products;
SELECT* FROM products ORDER BY product_id;

SELECT* FROM product_images ORDER BY product_id;



CREATE TABLE cart (
    cart_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE,
    session_id VARCHAR(255) UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CHECK (user_id IS NOT NULL OR session_id IS NOT NULL)
);

CREATE INDEX idx_cart_user_id ON cart(user_id);
CREATE INDEX idx_cart_session_id ON cart(session_id);
CREATE INDEX idx_cart_expires_at ON cart(expires_at);


CREATE TABLE cart_items (
    cart_item_id BIGSERIAL PRIMARY KEY,
    cart_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_addition DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE(cart_id, product_id)
);

CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);


-- Get all items in a user's cart with product details
-- Get all items in a user's cart with product details and image
SELECT 
    ci.cart_item_id,
    p.product_name,
    pi.image_url,
    ci.quantity,
    ci.price_at_addition,
    (ci.quantity * ci.price_at_addition) as total_price
FROM cart c
JOIN cart_items ci ON c.cart_id = ci.cart_id
JOIN products p ON ci.product_id = p.product_id
LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = TRUE
WHERE c.user_id = 1 AND c.is_active = TRUE;
-- Get cart total for a user
SELECT 
    SUM(ci.quantity * ci.price_at_addition) as cart_total,
    COUNT(ci.cart_item_id) as total_items
FROM cart c
JOIN cart_items ci ON c.cart_id = ci.cart_id
WHERE c.user_id = 1 AND c.is_active = TRUE;

-- Add item to cart (or update quantity if exists)
INSERT INTO cart_items (cart_id, product_id, quantity, price_at_addition)
VALUES (1, 5, 2, 14.00)
ON CONFLICT (cart_id, product_id) 
DO UPDATE SET 
    quantity = cart_items.quantity + EXCLUDED.quantity,
    updated_at = CURRENT_TIMESTAMP;

-- Remove item from cart
DELETE FROM cart_items WHERE cart_item_id = 1;

-- Clear entire cart
DELETE FROM cart_items WHERE cart_id = 1;

-- Auto-delete expired guest carts (cleanup job)
DELETE FROM cart WHERE expires_at < CURRENT_TIMESTAMP AND session_id IS NOT NULL;


CREATE TABLE chatbot_conversations (
    conversation_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    session_id VARCHAR(255),
    conversation_title VARCHAR(255),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    user_rating INT CHECK (user_rating >= 1 AND user_rating <= 5),
    feedback TEXT,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    last_message_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    CHECK (user_id IS NOT NULL OR session_id IS NOT NULL)
);

CREATE INDEX idx_chatbot_conversations_user_id ON chatbot_conversations(user_id);
CREATE INDEX idx_chatbot_conversations_session_id ON chatbot_conversations(session_id);
CREATE INDEX idx_chatbot_conversations_status ON chatbot_conversations(status);
CREATE INDEX idx_chatbot_conversations_last_message ON chatbot_conversations(last_message_at);

CREATE TABLE chatbot_messages (
    message_id BIGSERIAL PRIMARY KEY,
    conversation_id BIGINT NOT NULL,
    sender_type VARCHAR(20) NOT NULL,
    message_text TEXT NOT NULL,
    intent VARCHAR(100),
    suggested_products TEXT,
    has_prescription_query BOOLEAN DEFAULT FALSE,
    confidence_score DECIMAL(5,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES chatbot_conversations(conversation_id) ON DELETE CASCADE,
    CHECK (sender_type IN ('USER', 'BOT', 'SYSTEM'))
);

CREATE INDEX idx_chatbot_messages_conversation ON chatbot_messages(conversation_id);
CREATE INDEX idx_chatbot_messages_created_at ON chatbot_messages(created_at);
CREATE INDEX idx_chatbot_messages_intent ON chatbot_messages(intent);


CREATE TABLE faq (
    faq_id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    keywords TEXT,
    related_products TEXT,
    view_count INT DEFAULT 0,
    helpful_count INT DEFAULT 0,
    not_helpful_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
);

CREATE INDEX idx_faq_category ON faq(category);
CREATE INDEX idx_faq_active ON faq(is_active);
CREATE INDEX idx_faq_keywords ON faq(keywords);

-- Insert sample FAQs
INSERT INTO faq (category, question, answer, keywords) VALUES
('Orders', 'How do I place an order?', 'To place an order, browse products, add items to cart, and proceed to checkout. You can pay via card, UPI, or cash on delivery.', 'order, place order, how to order, buy'),
('Delivery', 'What is the delivery time?', 'We deliver within 24-48 hours for most locations. Express delivery is available in select cities.', 'delivery, shipping, time, how long'),
('Prescription', 'Do I need a prescription?', 'Some medicines require a valid prescription. You can upload it during checkout or email it to us.', 'prescription, rx, required, upload'),
('Returns', 'What is your return policy?', 'We accept returns within 7 days for unopened products. Prescription medicines cannot be returned.', 'return, refund, exchange, policy'),
('Payment', 'What payment methods do you accept?', 'We accept credit/debit cards, UPI, net banking, wallets, and cash on delivery.', 'payment, pay, methods, options'),
('Account', 'How do I reset my password?', 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.', 'password, reset, forgot, login'),
('Medicines', 'Are your medicines genuine?', 'Yes, all our medicines are sourced directly from authorized distributors and manufacturers.', 'genuine, authentic, real, quality'),
('Chatbot', 'How does the chatbot help?', 'Our chatbot can help you find medicines, answer queries, track orders, and provide health tips.', 'chatbot, bot, help, assistance');


-- Get all messages in a conversation
SELECT 
    m.message_id,
    m.sender_type,
    m.message_text,
    m.created_at
FROM chatbot_messages m
WHERE m.conversation_id = 1
ORDER BY m.created_at ASC;

-- Get user's conversation history
SELECT 
    c.conversation_id,
    c.conversation_title,
    c.started_at,
    c.status,
    COUNT(m.message_id) as message_count
FROM chatbot_conversations c
LEFT JOIN chatbot_messages m ON c.conversation_id = m.conversation_id
WHERE c.user_id = 1
GROUP BY c.conversation_id
ORDER BY c.started_at DESC;

-- Search FAQs by keyword
SELECT * FROM faq 
WHERE is_active = TRUE 
AND (LOWER(question) LIKE '%prescription%' OR LOWER(keywords) LIKE '%prescription%')
ORDER BY display_order, helpful_count DESC;

-- Get most helpful FAQs
SELECT * FROM faq 
WHERE is_active = TRUE 
ORDER BY helpful_count DESC, view_count DESC 
LIMIT 10;

-- Create new conversation and add first message
INSERT INTO chatbot_conversations (user_id, session_id, conversation_title) 
VALUES (1, NULL, 'Medicine inquiry') 
RETURNING conversation_id;

-- Add message to conversation
INSERT INTO chatbot_messages (conversation_id, sender_type, message_text, intent) 
VALUES (1, 'USER', 'I need medicine for headache', 'medicine_search');