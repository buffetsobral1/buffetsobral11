```sql
-- Supabase Schema Completo - Buffet Sobral
-- Execute este script no SQL Editor do Supabase

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Serviços
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('decoracao', 'buffet', 'espaco', 'entretenimento', 'outros')),
  base_price DECIMAL(10,2) DEFAULT 0,
  price_per_person DECIMAL(10,2) DEFAULT 0,
  min_people INTEGER DEFAULT 1,
  max_people INTEGER DEFAULT 1000,
  image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Pacotes
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('aniversario', 'casamento', 'formatura', 'corporativo', 'outros')),
  base_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  price_per_person DECIMAL(10,2) DEFAULT 0,
  min_people INTEGER DEFAULT 50,
  max_people INTEGER DEFAULT 500,
  included_services UUID[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Orçamentos
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  guest_count INTEGER NOT NULL CHECK (guest_count > 0),
  selected_package UUID REFERENCES packages(id),
  additional_services UUID[] DEFAULT '{}',
  total_price DECIMAL(10,2),
  client_name TEXT,
  client_email TEXT,
  client_phone TEXT,
  event_date DATE,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Fotos do Espaço
CREATE TABLE space_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT DEFAULT 'espaco',
  description TEXT,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT true
);

-- Tabela de Configuração de Streaming
CREATE TABLE streaming_config (
  id SERIAL PRIMARY KEY,
  channel_id TEXT,
  status TEXT DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'maintenance')),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Vídeos em Destaque
CREATE TABLE featured_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  video_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  added_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT true
);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Políticas de Segurança (RLS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE space_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaming_config ENABLE ROW LEVEL SECURITY;

-- Políticas para leitura pública de dados ativos
CREATE POLICY "Public read active services" ON services
    FOR SELECT USING (active = true);

CREATE POLICY "Public read active packages" ON packages
    FOR SELECT USING (active = true);

CREATE POLICY "Public read active photos" ON space_photos
    FOR SELECT USING (active = true);

CREATE POLICY "Public read active videos" ON featured_videos
    FOR SELECT USING (active = true);

-- Políticas para administradores (usuários autenticados)
CREATE POLICY "Admin full access services" ON services
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access packages" ON packages
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access quotes" ON quotes
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access photos" ON space_photos
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access videos" ON featured_videos
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access streaming" ON streaming_config
    FOR ALL USING (auth.role() = 'authenticated');

-- Política para inserção pública de orçamentos
CREATE POLICY "Public insert quotes" ON quotes
    FOR INSERT WITH CHECK (true);

-- Inserir dados iniciais de exemplo
INSERT INTO services (name, description, category, base_price, price_per_person, features) VALUES
('Buffet Completo', 'Salgados, doces, bebidas e serviço completo', 'buffet', 0, 45, ARRAY['Salgados variados', 'Doces finos', 'Bebidas inclusas', 'Serviço de garçons']),
('Bolo Personalizado', 'Bolos temáticos e personalizados para sua festa', 'buffet', 120, 0, ARRAY['Design personalizado', 'Sabores variados', 'Decoração temática']),
('Decoração Temática', 'Decoração completa para todos os tipos de festa', 'decoracao', 200, 0, ARRAY['Decoração personalizada', 'Flores e arranjos', 'Iluminação especial']),
('Coffee Break Corporativo', 'Café, salgados, doces e sucos para eventos empresariais', 'buffet', 0, 25, ARRAY['Café premium', 'Salgados executivos', 'Sucos naturais']),
('Jantar Executivo', 'Menu sofisticado para jantares corporativos e eventos formais', 'buffet', 0, 85, ARRAY['Menu gourmet', 'Serviço à francesa', 'Bebidas premium']),
('Coquetel de Confraternização', 'Finger foods, canapés e bebidas para eventos sociais', 'buffet', 0, 35, ARRAY['Finger foods', 'Canapés variados', 'Bebidas especiais']),
('Lanche para Eventos', 'Sanduíches, salgados e refrigerantes para eventos casuais', 'buffet', 0, 18, ARRAY['Sanduíches artesanais', 'Salgados frescos', 'Refrigerantes']),
('Churrasco Completo', 'Carnes nobres, acompanhamentos e saladas para confraternizações', 'buffet', 0, 55, ARRAY['Carnes nobres', 'Acompanhamentos tradicionais', 'Saladas frescas']);

INSERT INTO packages (name, description, event_type, base_price, price_per_person, min_people, max_people, features) VALUES
('Pacote Básico', 'Ideal para eventos simples e econômicos', 'aniversario', 0, 35, 20, 100, ARRAY['Buffet simples', 'Refrigerantes', 'Bolo básico', 'Decoração simples']),
('Pacote Completo', 'Tudo que você precisa para uma festa inesquecível', 'aniversario', 0, 55, 50, 300, ARRAY['Buffet completo', 'Bebidas variadas', 'Bolo personalizado', 'Decoração temática']),
('Pacote Corporativo', 'Perfeito para eventos empresariais', 'corporativo', 500, 45, 30, 200, ARRAY['Coffee break', 'Almoço executivo', 'Equipamentos AV', 'Serviço profissional']),
('Pacote Casamento', 'Para o dia mais especial da sua vida', 'casamento', 2000, 75, 100, 500, ARRAY['Buffet premium', 'Bolo de casamento', 'Decoração romântica', 'Serviço completo']);

INSERT INTO space_photos (name, url, category, description) VALUES
('Salão Principal', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400', 'espaco', 'Amplo salão para eventos de todos os tamanhos'),
('Área Externa', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400', 'espaco', 'Jardim e área externa para cerimônias'),
('Cozinha Profissional', 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400', 'cozinha', 'Cozinha equipada para grandes eventos');

INSERT INTO featured_videos (url, video_id, title, description, thumbnail_url) VALUES
('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'Tour pelo Espaço', 'Conheça todas as áreas do nosso buffet em um tour completo', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'),
('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'Festa de Aniversário', 'Veja como foi a festa de aniversário da Maria, com 150 convidados', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg');

INSERT INTO streaming_config (channel_id, status) VALUES
('UC_your_channel_id', 'inactive');

-- Criar buckets de storage
INSERT INTO storage.buckets (id, name, public) VALUES 
('service-images', 'service-images', true),
('space-photos', 'space-photos', true),
('video-thumbnails', 'video-thumbnails', true);

-- Políticas de storage para upload de imagens (apenas admins)
CREATE POLICY "Admin upload service images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'service-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin upload space photos" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'space-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Admin upload video thumbnails" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'video-thumbnails' AND auth.role() = 'authenticated');

-- Políticas de storage para leitura pública
CREATE POLICY "Public read service images" ON storage.objects
    FOR SELECT USING (bucket_id = 'service-images');

CREATE POLICY "Public read space photos" ON storage.objects
    FOR SELECT USING (bucket_id = 'space-photos');

CREATE POLICY "Public read video thumbnails" ON storage.objects
    FOR SELECT USING (bucket_id = 'video-thumbnails');

-- Políticas de storage para admins (delete/update)
CREATE POLICY "Admin manage service images" ON storage.objects
    FOR ALL USING (bucket_id = 'service-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin manage space photos" ON storage.objects
    FOR ALL USING (bucket_id = 'space-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Admin manage video thumbnails" ON storage.objects
    FOR ALL USING (bucket_id = 'video-thumbnails' AND auth.role() = 'authenticated');
```