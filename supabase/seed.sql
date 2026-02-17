-- Phase 2.1: Updated Seed Data for Venswa Studio Portfolio V2.0

-- Insert clients
INSERT INTO clients (name, logo_url, website, sort_order, is_featured) VALUES
('Mandava’s Bhojanam', 'https://via.placeholder.com/150x80/2E4CB8/FFFFFF?text=Mandava', NULL, 1, true),
('STHIRA Lab Grown Diamonds', 'https://via.placeholder.com/150x80/1FB57A/FFFFFF?text=STHIRA', NULL, 2, true),
('Ikase Motif', 'https://via.placeholder.com/150x80/D4A63F/FFFFFF?text=Ikas', NULL, 3, true),
('Studio Ikase', 'https://via.placeholder.com/150x80/2E4CB8/FFFFFF?text=Studio+Ikas', NULL, 4, true),
('Indira Ulavacharu', 'https://via.placeholder.com/150x80/1FB57A/FFFFFF?text=Indira', NULL, 5, true),
('Ramdev Technologies', 'https://via.placeholder.com/150x80/D4A63F/FFFFFF?text=Ramdev', NULL, 6, false),
('Trust Hospital', 'https://via.placeholder.com/150x80/2E4CB8/FFFFFF?text=Trust', NULL, 7, false),
('Stunnerz', 'https://via.placeholder.com/150x80/1FB57A/FFFFFF?text=Stunnerz', NULL, 8, false),
('Kanchipuram Perumal Silks', 'https://via.placeholder.com/150x80/D4A63F/FFFFFF?text=Kanchipuram', NULL, 9, false),
('VeeVibe', 'https://via.placeholder.com/150x80/2E4CB8/FFFFFF?text=VeeVibe', NULL, 10, false),
('Bodepudi Travels', 'https://via.placeholder.com/150x80/1FB57A/FFFFFF?text=Bodepudi', NULL, 11, false),
('Pickleball Brand', 'https://via.placeholder.com/150x80/D4A63F/FFFFFF?text=Pickleball', NULL, 12, false),
('Neo Screens', 'https://via.placeholder.com/150x80/2E4CB8/FFFFFF?text=Neo+Screens', NULL, 13, false);

-- Insert services
INSERT INTO services (title, short_desc, long_desc, icon, sort_order) VALUES
('Social Media Management', 'Instagram, Facebook, YouTube handling', 'We handle your entire social media presence, from daily posts to community engagement, ensuring your brand stays active and relevant.', 'social-media', 1),
('Content Strategy & Branding', 'Brand positioning and visual direction', 'We define your brand’s voice, visual identity, and long-term content strategy to ensure every piece of content serves a purpose.', 'strategy', 2),
('Professional Shoots', 'Product photography and brand videos', 'High-quality product photography, brand videos, and social media reels that capture the essence of your brand.', 'video', 3),
('Design & Editing', 'Posters, Carousels, Reels, Video editing', 'Our design team creates stunning visuals, from carousel posts to high-energy reel edits, that stop the scroll.', 'content', 4),
('Posting & Scheduling', 'Consistent content execution', 'We take the headache out of posting with a consistent, calendar-based schedule that ensures your audience always sees you.', 'calendar', 5),
('Growth Strategy', 'Page optimization and engagement strategy', 'Data-driven strategies to optimize your pages, increase reach, and convert followers into loyal customers.', 'growth', 6),
('Paid Ads', 'Lead generation and awareness campaigns', 'Strategic paid advertising campaigns on Facebook and Instagram to drive targeted traffic and generate leads.', 'ads', 7);

-- Insert projects (using new clients)
INSERT INTO projects (title, client_id, industry, platforms, services, cover_media_url, gallery, results, description, slug, published) VALUES
('Mandava’s Bhojanam Launch', (SELECT id FROM clients WHERE name = 'Mandava’s Bhojanam'), 'Food & Beverage', ARRAY['Instagram', 'Facebook'], ARRAY['Social Media Management', 'Professional Shoots'], 'https://via.placeholder.com/800x600/2E4CB8/FFFFFF?text=Mandava+Launch', '["https://via.placeholder.com/400x300/2E4CB8/FFFFFF?text=Dish1", "https://via.placeholder.com/400x300/1FB57A/FFFFFF?text=Dish2"]', '{"reach": 150000, "engagement_rate": 10.5, "walk_ins": 300}', 'Launched the new location with a mouth-watering social media campaign.', 'mandava-launch', true),
('STHIRA Diamond Collection', (SELECT id FROM clients WHERE name = 'STHIRA Lab Grown Diamonds'), 'Jewellery', ARRAY['Instagram', 'Pinterest'], ARRAY['Content Strategy & Branding', 'Professional Shoots'], 'https://via.placeholder.com/800x600/1FB57A/FFFFFF?text=Sthira+Collection', '["https://via.placeholder.com/400x300/1FB57A/FFFFFF?text=Ring1", "https://via.placeholder.com/400x300/D4A63F/FFFFFF?text=Ring2"]', '{"reach": 500000, "website_clicks": 2500, "sales_increase": 40}', 'Showcased the brilliance of lab-grown diamonds through high-end photography.', 'sthira-diamond-collection', true),
('Ikas Motif Rebrand', (SELECT id FROM clients WHERE name = 'Ikas Motif'), 'Fashion', ARRAY['Instagram', 'YouTube'], ARRAY['Design & Editing', 'Growth Strategy'], 'https://via.placeholder.com/800x600/D4A63F/FFFFFF?text=Ikas+Rebrand', '["https://via.placeholder.com/400x300/D4A63F/FFFFFF?text=Look1", "https://via.placeholder.com/400x300/2E4CB8/FFFFFF?text=Look2"]', '{"reach": 300000, "follower_growth": 5000}', 'Rebranded the fashion line with a modern, chic aesthetic.', 'ikas-motif-rebrand', true);

-- Insert testimonials
INSERT INTO testimonials (client_name, role, quote, client_logo_url, is_featured) VALUES
('Client A', 'Owner, Mandava’s Bhojanam', 'Venswa Studios transformed our online presence. The food photography is next level!', NULL, true),
('Client B', 'CEO, STHIRA', 'Professional, creative, and results-driven. Highly recommended.', NULL, true);
