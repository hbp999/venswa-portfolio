-- Phase 2: Database Schema for Venswa Studios Portfolio

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clients table
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    logo_url TEXT,
    website TEXT,
    sort_order INTEGER,
    is_featured BOOLEAN DEFAULT false
);

-- Services table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    short_desc TEXT,
    long_desc TEXT,
    icon TEXT,
    sort_order INTEGER
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    industry TEXT,
    platforms TEXT[],
    services TEXT[],
    cover_media_url TEXT,
    gallery JSONB,
    results JSONB,
    description TEXT,
    slug TEXT UNIQUE,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Testimonials table
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT,
    role TEXT,
    quote TEXT,
    client_logo_url TEXT,
    is_featured BOOLEAN DEFAULT false
);

-- Leads table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    budget_range TEXT,
    message TEXT,
    source_page TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    status TEXT DEFAULT 'new'
);

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public read access policies for content tables
CREATE POLICY "Clients are viewable by everyone" ON clients
    FOR SELECT USING (true);

CREATE POLICY "Projects are viewable by everyone" ON projects
    FOR SELECT USING (published = true);

CREATE POLICY "Services are viewable by everyone" ON services
    FOR SELECT USING (true);

CREATE POLICY "Testimonials are viewable by everyone" ON testimonials
    FOR SELECT USING (true);

-- Restricted access for leads table (only service role can read)
CREATE POLICY "Leads are insertable by everyone" ON leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Leads are only viewable by service role" ON leads
    FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Leads are only updateable by service role" ON leads
    FOR UPDATE USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Leads are only deletable by service role" ON leads
    FOR DELETE USING (auth.jwt() ->> 'role' = 'service_role');
