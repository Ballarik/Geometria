-- =========================================================================
-- SCRIPT SQL PER CONFIGURARE IL DATABASE SUPABASE (GEOMETRIA)
-- Incolla questo script nell'editor SQL di Supabase (SQL Editor -> New Query)
-- =========================================================================

-- 1. TABELLA TEOREMI E DEFINIZIONI (items)
CREATE TABLE IF NOT EXISTS public.items (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    chapter TEXT NOT NULL,
    name TEXT NOT NULL,
    content TEXT,
    proof TEXT,
    notes TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELLA PROGRESSI DI APPRENDIMENTO / MACHINE LEARNING (learning)
CREATE TABLE IF NOT EXISTS public.learning (
    item_id TEXT PRIMARY KEY REFERENCES public.items(id) ON DELETE CASCADE,
    score INT DEFAULT 0,
    ease_factor FLOAT DEFAULT 2.5,
    interval INT DEFAULT 1,
    repetition INT DEFAULT 0,
    last_reviewed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    history JSONB DEFAULT '[]'::jsonb
);

-- 3. PERMESSI DI LETTURA E SCRITTURA PER ACCESSO PUBBLICO (ANON)
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accesso pubblico lettura items" ON public.items FOR SELECT USING (true);
CREATE POLICY "Accesso pubblico inserimento items" ON public.items FOR INSERT WITH CHECK (true);
CREATE POLICY "Accesso pubblico modifica items" ON public.items FOR UPDATE USING (true);
CREATE POLICY "Accesso pubblico eliminazione items" ON public.items FOR DELETE USING (true);

CREATE POLICY "Accesso pubblico lettura learning" ON public.learning FOR SELECT USING (true);
CREATE POLICY "Accesso pubblico inserimento learning" ON public.learning FOR INSERT WITH CHECK (true);
CREATE POLICY "Accesso pubblico modifica learning" ON public.learning FOR UPDATE USING (true);
CREATE POLICY "Accesso pubblico eliminazione learning" ON public.learning FOR DELETE USING (true);
